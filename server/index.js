const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
const accpetedOrdersModel= require("./acceptedOrders")
const adminModel = require("./adminmodel");
const postModel = require("./orderrequest");
const sellerModel = require("./sellermodel");
const productModel = require("./productmodel");
const sellerRequestModel = require("./sellerrequest");
const orderModel = require("./neworder");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const acceptedOrders = require("./acceptedOrders");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Login first");
  }
  try {
    const data = jwt.verify(token, "secret");
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}
function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }
  next();
}
function isSeller(req, res, next) {
  if (!req.user || req.user.role !== "seller") {
    return res.status(403).send("Access denied");
  }
  next();
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ADMIN
app.post("/create/admin", isLoggedIn, isAdmin, (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    const admin = await adminModel.create({
      role: "admin",
      email: req.body.email,
      password: hash,
    });
    res.send(admin);
  });
});
// app.get("/admin", async(req, res)=>{
//     const admin = await adminModel.find()
//     const token = jwt.sign({role : admin[0].role}, "role")
//     res.cookie("token", token)
//     res.send(admin)
// })
app.post("/login", async (req, res) => {
  let user = await adminModel.findOne({ email: req.body.email });
  if (user) {
    const passwordValidation = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (passwordValidation) {
      // res.cookie("token", "")
      const token = jwt.sign(
        { email: user.email, user: user._id, role: user.role },
        "secret"
      );
      res.cookie("token", token);
      return res.status(200).send("Login successful");
    } else {
      return res.status(401).send("Incorrect password");
    }
  }

  user = await sellerModel.findOne({ email: req.body.email });
  if (user) {
    const passwordValidation = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (passwordValidation) {
      const token = jwt.sign(
        {
          email: user.email,
          user: user._id,
          role: user.role,
          category: user.category,
        },
        "secret"
      );
      res.cookie("token", token);
      return res.status(200).send("Seller login");
    } else {
      return res.status(401).send("incorrect password");
    }

    res.status(404).send("Couldn't find user");
  } else {
    res.status(500).send("couldn't find user");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.send("Logout");
});
// app.post("/newseller", async(req, res)=>{
//     try{
//     let findold = await sellerRequestModel.findOne({email: req.body.email})
//     if(findold){
//         res.send("User already exists")
//     }
//     findold = await sellerModel.findOne({email:req.body.email})
//     if(findold){
//         res.send("User already exists")
//     }
//     bcrypt.hash(req.body.password, 10, async (err, hash) => {
//         if (err) {
//             return res.status(500).send("Error hashing password.");
//         }

//         try {
//             const newSeller = await sellerRequestModel.create({
//                 role: "seller",
//                 name: req.body.name,
//                 address: req.body.address,
//                 contact: req.body.contact,
//                 email: req.body.email,
//                 password: hash,
//                 category: req.body.category
//             });
//             res.send(newSeller);
//         } catch (dbError) {
//             if (dbError.code === 11000) {
//                 res.status(400).send("Email is already registered.");
//             } else {
//                 res.status(500).send("An error occurred: " + dbError.message);
//             }
//         }
//     });

// }catch(error){
//         res.status(500).send(error.message)
//     }

// })
app.post("/newseller", async (req, res) => {
  try {
    let findold = await sellerRequestModel.findOne({ email: req.body.email });
    if (findold) {
      return res
        .status(400)
        .send("User already recorded for seller registration");
    }
    findold = await sellerModel.findOne({ email: req.body.email });
    if (findold) {
      return res.status(400).send("User already exists as a seller.");
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).send("Error hashing password.");
      }
      try {
        const newSeller = await sellerRequestModel.create({
          role: "seller",
          name: req.body.name,
          address: req.body.address,
          contact: req.body.contact,
          email: req.body.email,
          password: hash,
          category: req.body.category,
        });
        res.send(newSeller);
      } catch (dbError) {
        if (dbError.code === 11000) {
          res.status(400).send("Email is already registered.");
        } else {
          res.status(500).send("An error occurred: " + dbError.message);
        }
      }
    });
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
});
app.get("/sellersrequest", isLoggedIn, isAdmin, async (req, res) => {
  const sellers = await sellerRequestModel.find();
  res.send(sellers);
});

app.delete("/delrequest/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    await sellerRequestModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).send({ message: "deleted" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete seller request." });
  }
});

app.post("/approveseller/:id", isLoggedIn, isAdmin, async (req, res) => {
  const approvedseller = await sellerModel.create({
    role: "seller",
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
    category: req.body.category,
    product: [],
  });
  const sellerrequest = await sellerRequestModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.send(sellerrequest);
});
app.get("/sellers", isLoggedIn, isAdmin, async (req, res) => {
  const sellers = await sellerModel.find();
  res.send(sellers);
});

app.delete("/delseller/:id", isLoggedIn, isAdmin, async (req, res) => {
  const deleteseller = await sellerModel.findOneAndDelete({
    _id: req.params.id,
  });
  const delproduct = await productModel.findOneAndDelete({
    seller : req.params.id
  })
  res.send("deleteseller");
});

app.get("/seeListedItems/:id", isLoggedIn, isAdmin, async (req, res) => {
  const products = await productModel.find({ seller: req.params.id });
  res.send(products);
});
app.get("/postlists", isLoggedIn, isAdmin, async (req, res) => {
  const posts = await postModel.find();
  res.json(
    posts.map(post => ({
      ...post._doc,
      image: post.image ? `data:image/png;base64,${post.image.toString("base64")}` : null,
    }))
  );
});
app.delete("/delpost/:id", isLoggedIn, isAdmin, async(req, res)=>{
  const post = await postModel.findOneAndDelete({_id: req.params.id})
  res.send(post)
})
// SELLER

app.post(
  "/uploaditem",
  isLoggedIn,
  isSeller,
  upload.single("image"),
  async (req, res) => {
    // id = req.user.user
    const newitem = await productModel.create({
      img: req.file.buffer,
      productname: req.body.productname,
      category: req.user.category,
      model: req.body.model,
      price: req.body.price,
      description: req.body.description,
      seller: req.user.user,
    });
    res.send(newitem);
  }
);
app.get("/yourproducts", isLoggedIn, isSeller, async (req, res) => {
  try {
    const products = await productModel.find({ seller: req.user.user });
    const productsWithImage = products.map((product) => {
      return {
        ...product.toObject(),
        img: product.img ? product.img.toString("base64") : null,
      };
    });
    res.send(productsWithImage);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ error: "Failed to fetch products" });
  }
});

app.get("/listeditems", async (req, res) => {
  const products = await productModel.find();
  const productsWithImage = products.map((product) => {
    return {
      ...product.toObject(),
      img: product.img ? product.img.toString("base64") : null,
    };
  });
  res.send(productsWithImage);
});
app.get("/viewproduct/:id", async (req, res) => {
  const product = await productModel.findOne({ _id: req.params.id });
  const seller = await sellerModel.findOne({ _id: product.seller });
  const productData = {
    ...product.toObject(),
    img: product.img ? product.img.toString("base64") : null,
    seller: seller.name,
    sellerid: seller._id,
  };

  res.send(productData);
});
app.delete("/deleteitem/:id", isLoggedIn, isSeller, async (req, res) => {
  await productModel.findOneAndDelete({ _id: req.params.id });
  res.send("deleted");
});
app.get("/getorders", isLoggedIn, isSeller, async (req, res) => {
  try {
    const orders = await orderModel.find({ sellerOfProduct: req.user.user });
    const ordersWithProductDetails = await Promise.all(
      orders.map(async (order) => {
        const product = await productModel.findById(order.productOrdered);
        return {
          ...order.toObject(),
          product: product ? product.toObject() : null,
        };
      })
    );
    res.send(ordersWithProductDetails);
  } catch (error) {
    console.error("Error fetching orders for seller:", error);
    res.status(500).send({ error: "Failed to fetch orders for seller." });
  }
});
app.delete("/ordercompleted/:id", isLoggedIn, isSeller, async (req, res) => {
  const completedOrder = await orderModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.send(completedOrder);
});

app.get("/updateyourproduct/:id", isLoggedIn, isSeller, async (req, res) => {
  const product = await productModel.findOne({ _id: req.params.id });

  if (product && product.img instanceof Buffer) {
    const imgBase64 = product.img.toString("base64");
    res.send({ ...product.toObject(), img: imgBase64 });
  } else {
    res.send(product);
  }
});
app.put("/update/:id", isLoggedIn, isSeller, async (req, res) => {
  const update = await productModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  return update;
});
app.get("/orderrequests", isLoggedIn, isSeller, async(req, res)=>{
    const orders = await postModel.find({ category: req.user.category });
    const ordersWithImages = orders.map(order => {
      if (order.image && order.image.buffer) {
        const base64Image = order.image.toString('base64');
        return {
          ...order.toObject(),
          image: `data:image/jpeg;base64,${base64Image}` 
        };
      }
      return order.toObject();
    });
    res.json(ordersWithImages);
})
app.get("/requestitem/:id", isLoggedIn, isSeller, async(req, res)=>{
  try {
    const item = await postModel.findOne({ _id: req.params.id });
    if (item) {
      const itemWithImage = {
        ...item.toObject(),
        image: item.image ? `data:image/jpeg;base64,${item.image.toString("base64")}` : null,
      };
      res.send(itemWithImage);
    } else {
      res.status(404).send({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).send({ error: "Failed to fetch item" });
  }
})
app.post("/takenorder/:id", isLoggedIn, isSeller, async(req, res)=>{
  const request = await postModel.findOne({_id: req.params.id})
  const acceptedOrder = await accpetedOrdersModel.create({
    seller: req.user.user,
    name: request.name,
    productname: request.productname,
    contact: request.contact,
    price: request.price,
    location: request.location
  })
  const del = await postModel.findOneAndDelete({_id:req.params.id})
  res.send("done")
})
app.get("/acceptedorders", isLoggedIn, isSeller, async(req, res)=>{
  const accepted = await accpetedOrdersModel.find({seller: req.user.user})
  res.send(accepted)
})
app.delete("/completerequest/:id", async(req, res)=>{
  const del = await accpetedOrdersModel.findOneAndDelete({_id: req.params.id})
  res.send(del)
})
//USER
app.post("/neworder", async (req, res) => {
  let order = await orderModel.create({
    name: req.body.name,
    contact: req.body.contact,
    address: "req.body.address",
    email: req.body.email,
    location: req.body.location,
    productOrdered: req.body.productOrdered,
    sellerOfProduct: req.body.sellerOfProduct,
  });
  res.send(order);
});
app.post("/addrequirement", upload.single('image'), async (req, res) => {
  const post = await postModel.create({
    name : req.body.name,
    productname: req.body.productname,
    contact: req.body.contact,
    price: req.body.price,
    location: req.body.location,
    description: req.body.description,
    image: req.file.buffer,
    category: req.body.category,
  });
  res.send(post)
});
app.get("/searcheditem", async (req, res) => {
  const searchTerm = req.query.search; 
  try {
    const items = await productModel.find({
      $or: [
        { productname: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { model: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } }
      ]
    });
    const formattedItems = items.map(item => ({
      ...item.toObject(),
      img: item.img.toString('base64')
    }));
    res.send(formattedItems); 
  } catch (error) {
    console.error("Error searching items:", error);
    res.status(500).send("Error searching items");
  }
});

app.listen(8080);
