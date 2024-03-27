var cl = console.log;

const stdForm = document.getElementById("stdForm");
const stdContainer = document.getElementById("stdcontainer");
const updateBtn = document.getElementById("updateBtn");
const submitBtn = document.getElementById("submitBtn");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");
const noStd = document.getElementById("noStd");
const stdtable = document.getElementById("stdtable");


let stdArr = [];

Uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};




const onEdit = (ele) => {
        let editId = ele.closest("tr").id;
        cl(editId)
        localStorage.setItem("editId", editId);
         let obj =stdArr.find(std => std.stdId === editId)
         cl(obj)
         fnameControl.value  = obj.fname;
         lnameControl.value  = obj.lname;
         emailControl.value  = obj.email;
         contactControl.value  = obj.contact;
         updateBtn.classList.remove("d-none");
         submitBtn.classList.add("d-none");
}

// const onDelete = (ele) => {
//     let getConfirm = confirm(`Are ypu sure,You want to delete this Item?`)
//     cl(getConfirm);
//     if(getConfirm){
//         cl(ele)
//         let deleteId = ele.closest("tr").id;
//         cl(deleteId);
//         let getIndex = stdArr.findIndex(std => std.stdId === deleteId)
//         stdArr.splice(getIndex, 1);
//         localStorage.setItem("stdArr", JSON.stringify(stdArr));
//         ele.closest("tr").remove();
//     }else{
//         return
//     }
// }

const onDelete = (ele) => {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            
        let deleteId = ele.closest("tr").id;
        cl(deleteId);
        let getIndex = stdArr.findIndex(std => std.stdId === deleteId)
        stdArr.splice(getIndex, 1);
        localStorage.setItem("stdArr", JSON.stringify(stdArr));
        ele.closest("tr").remove();
        }
      });
}





const templatingOfStd = (arr) => {
    let result = ``;
    arr.forEach((std, i) => {
        result += `<tr id="${std.stdId}">
                        <td>${i +1}</td>
                        <td>${std.fname}</td>
                        <td>${std.lname}</td>
                        <td>${std.email}</td>
                        <td>${std.contact}</td>
                        <td><i class="fa-regular fa-pen-to-square fa-2x text-success" onClick="onEdit(this)"></i></td>
                        <td><i class="fa-solid fa-trash-can fa-2x text-danger" onClick="onDelete(this)"></i></td>
                    </tr>`
     }) 
     stdContainer.innerHTML = result;
}


if(localStorage.getItem("stdArr")){
    stdArr = JSON.parse(localStorage.getItem("stdArr"));
    templatingOfStd(stdArr);
}

const stdCount = () => {
    if(stdArr.length > 0) {
        noStd.classList.add("d-none")
        stdtable.classList.remove("d-none")
    }else{
        noStd.classList.remove("d-none")
        stdtable.classList.add("d-none")
    }
}

stdCount();
const addStd = (obj) => {
    let tr = document.createElement("tr");
    tr.id = obj.stdId;
    tr.innerHTML =     `<td>${1}</td>
                        <td>${obj.fname}</td>
                        <td>${obj.lname}</td>
                        <td>${obj.email}</td>
                        <td>${obj.contact}</td>
                        <td><i class="fa-regular fa-pen-to-square fa-2x text-success" onClick="onEdit(this)"></i></td>
                        <td><i class="fa-solid fa-trash-can fa-2x text-danger" onClick="onDelete(this)"></i></td>`;
                        stdContainer.prepend(tr);
                        let allTr = [...stdContainer.children];
            
            for(let i = 0; i < stdArr.length; i++){
                cl(i)
               allTr[i].firstElementChild.innerHTML = i + 1; 
            }
}
const onStdAdd = (e) => {
            e.preventDefault();
            let newStd = {
                fname : fnameControl.value,
                lname : lnameControl.value,
                email : emailControl.value,
                contact : contactControl.value,
                stdId : Uuid()
            }
            cl(newStd);
            stdArr.unshift(newStd);
            localStorage.setItem("stdArr", JSON.stringify(stdArr));
            // templatingOfStd(stdArr);
            stdCount();
            addStd(newStd);
            
            
            e.target.reset();
            Swal.fire(
                {
                    title : `${newStd.fname} ${newStd.lname} is Added Successfully!!`,
                    icon : 'success',
                    timer : 3000
                }
            )
}

const onStdupdate = () => {
    let updateId = localStorage.getItem("editId")
        let updatedObj = {
            fname : fnameControl.value,
            lname : lnameControl.value,
            email : emailControl.value,
            contact : contactControl.value,
            stdId : updateId
        }
       
        
        cl(updatedObj, updateId);

        let getIndex = stdArr.findIndex(std => std.stdId === updateId);
        stdArr[getIndex] = updatedObj;
        cl(stdArr)
        localStorage.setItem("stdArr", JSON.stringify(stdArr));
        let tr = [...document.getElementById(updateId).children];
        cl(tr)
        tr[1].innerHTML = updatedObj.fname;
        tr[2].innerHTML = updatedObj.lname;
        tr[3].innerHTML = updatedObj.email;
        tr[4].innerHTML = updatedObj.contact;
        stdForm.reset();
        updateBtn.classList.add("d-none");
        submitBtn.classList.remove("d-none");
        Swal.fire(
            {
                title : `${updatedObj.fname} ${updatedObj.lname} is updated Successfully!!`,
                icon : 'success',
                timer : 2500
            }
        )
     
}


stdForm.addEventListener("submit",onStdAdd)

updateBtn.addEventListener("click", onStdupdate)