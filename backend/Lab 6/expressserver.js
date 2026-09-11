import express from "express";
//import dotev from "dotenv";
// import cors from "cors";
// app.use(cors());
//dotev.config();
//const port=process.env.PORT || 3000;
const port = 3000;
const app = express();
app.use(express.json());
// app.use(cors());
const userData = [
  {
    name: "John Doe",
    id: 1,
    class: "A",
  },
];



app.get("/user", (req, res) => {
  try {
    res.status(200).json({
      users: userData,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

app.get("/register", (req, res) => {
  try {
    res.status(200).json({
      users: registerData,
    });
  } catch (error) {
    console.error("Error fetching registered users:", error);
    res.status(500).json({
      message: "Failed to fetch registered users",
    });
  }
});

app.get("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userData.find((user) => user.id === userId);
  if (user) {
    res.status(200).json({
      user: user,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

app.post("/create", (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = {
      id: userData.length + 1,
      name,
      email,
    };
    userData.push(newUser);
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Failed to create user",
    });
  }
});

app.put("/edit/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = userData.findIndex((user) => user.id == userId);
  if (index !== -1) {
    const { name, class: className } = req.body;
    userData[index] = {
      ...userData[index],
      name,
      class: className,
    };
    res.status(200).json({
      message: "User updated successfully",
      user: userData[index],
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

app.delete("/delete/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = userData.findIndex((user) => user.id === userId);
  if (index !== -1) {
    userData.splice(index, 1);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = {
    username,
    password,
  };
  registerData.push(newUser);
  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = registerData.find(
    (user) => user.username === username && user.password === password,
  );
  if (user) {
    res.status(200).json({
      message: "Login successful",
      user: user,
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
