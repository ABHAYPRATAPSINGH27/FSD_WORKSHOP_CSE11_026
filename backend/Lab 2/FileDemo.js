import fs from "node:fs/promises";

const Filepath = "data.txt";

async function createFile(content) {
    try{
       await fs.writeFile(Filepath, content, "utf-8");
    console.log("File created successfully");
}
catch(error){
    console.log("Error creating file", error);
}
}

