import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCBVTI0SH2VaLRa28w8aipZg8zblK4I5Ds",
    authDomain: "coding-hub-project.firebaseapp.com",
    databaseURL: "http://coding-hub-project-default-rtdb.firebaseio.com",
    projectId: "coding-hub-project",
    storageBucket: "coding-hub-project.appspot.com",
    messagingSenderId: "517428888044",
    appId: "1:517428888044:web:2365bbd943997a47e940c9",
    measurementId: "G-Y2L2J82H57"
  };


const app = initializeApp(firebaseConfig);
const fdb = getFirestore(app);
const blogBut = document.querySelector('.blog-button');
const logOutBut = document.querySelector('.logout-button');
const qnaDataContainer = document.getElementById('qnaData');
const isUser = JSON.parse(localStorage.getItem("userData"));

if (!isUser) window.location.replace("index.html");


const renderBlogs = async () => {
    qnaDataContainer.innerHTML = "";


    const q = query(collection(fdb, "blogs"));

    const querySnapshot = await getDocs(q);
    const blogs = []
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        blogs.push(data);
    });

    if(!blogs.length){
        const div = document.createElement("div");
        div.innerHTML = `<p style="color:black;">No Blogs Found</p>`;
        qnaDataContainer.appendChild(div);
        return;
    }

    blogs.reverse().forEach(data => {
        const div = document.createElement("div");
        div.setAttribute(
            "class",
            "question"
        );
        div.addEventListener('click', () => questionSection(data));

        div.innerHTML = `<div class="info-Data">

          <div class="heading">
              <h1>${data.title}</h1>
          </div>
  
          <div class="description">
              <p>${data.description}</p>
          </div>
  
          <div class="admin-info">
              <span class="admin-Name"><i class="fa-solid fa-user"></i> ${data?.username}</span>
              <span class="issue-Date">${data?.date}</span>
          </div>
  
      </div>
  
      <div class="image-Section-1 image-Section-2">
      </div>`


        qnaDataContainer.appendChild(div);
    })



}

renderBlogs()

const blogSection = () => {

    window.location.href = "blog.html";

}


const logOutSection = () => {

    localStorage.removeItem("userData");
    window.location.href = "index.html";

}

const questionSection = (e) => {
    localStorage.setItem("blog",JSON.stringify(e))
    window.location.href = "question.html";

}

logOutBut.addEventListener('click', logOutSection);
blogBut.addEventListener('click', blogSection);