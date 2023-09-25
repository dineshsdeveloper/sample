const userModel = require("../model/usersModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userRegister = async (req, res, next) => {
  try {
    const oldUser = await userModel.findOne({ email: req.body.email });
    if (oldUser || req.body.email === "") {
      return res.json({ status: "user exist" });
    } else {
      const newUser = await userModel.create(req.body);
      const token = jwt.sign({ email: newUser.email }, "dinesh");
      res.cookie("token", token);
      return res.json({ status: "user created", newUser });
    }
  } catch (err) {
    console.log(err.message);
  }
};
const userLogin = async (req, res, next) => {
  try {
    const oldUser = await userModel.findOne({ email: req.body.email });
    if (oldUser) {
      if (req.body.password === oldUser.password) {
        const token = jwt.sign({ email: oldUser.email }, "dinesh");
        res.cookie("token", token);
        return res.json({ status: "user logined", token, oldUser });
      } else {
        return res.json({ status: "password does not match" });
      }
    } else {
      return res.json({ status: "email does not match" });
    }
  } catch (err) {
    console.log(err.message);
  }
};
const userOrders = async (req, res) => {
  try {
    const {
      userId,
      cartList,
      cartListTotalAmount,
      cartListTotalCount,
      cartListTotalDiscountAmount,
    } = req.body;
await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          orders: {
            orderedProducts: cartList,
            orderedProductsAmount:cartListTotalAmount,
            orderedProductsCount:cartListTotalCount,
            orderedProductsDiscountAmount:cartListTotalDiscountAmount,
            orderedDate: Date.now(),
          },
        },
      }
    );
    const user =await userModel.findById({_id:userId})
    return res.json({ status: `product ordered`, orders:user.orders });
  } catch (err) {
    console.log(err.message);
  }
};
const getUser = async (req, res) => {
  try {
    const findUserId = req.body.user_id;
    if (findUserId) {
      const user = await userModel.findOne({ _id: findUserId });
      return res.json({ status: "success", user });
    } else {
      return res.json({ status: "failed to find" });
    }
  } catch (err) {
    console.log(err.message);
  }
};
const getUserOrders = async(req,res)=>{
  try {
    const findUserId = req.body.user_id;
    if (findUserId) {
      const user = await userModel.findOne({ _id: findUserId });
      return res.json({ status: "success",orders:user.orders});
    } else {
      return res.json({ status: "failed to find" });
    }
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = { userRegister, userLogin, userOrders, getUser,getUserOrders };
