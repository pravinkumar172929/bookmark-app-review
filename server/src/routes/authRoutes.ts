import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
  console.log("req body => ", req.body);
  //   res.send("signup request");
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json("Email and password are required");
  } else {
    res.status(200);
    res.json("Validation passed");
  }
  //   res.json(req.body);
});

export default router;
