
//DEFINE VARIABLES
let UploadForm = document.querySelector('#UploadImageForm');
let upload_button = document.querySelector("#upload-image");
let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let upload_label = document.querySelector("#upload-label")
let start_label = document.querySelector("#start-label")
let click_label = document.querySelector("#click-label")
let canvas = document.querySelector("#canvas");
let file = null;



//-----------------homepage.html--------------------------------
//LOAD IMAGE AND PREVIEW BEFORE UPLOAD.
var openFile = function (event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;
        var output = document.getElementById('output');
        output.style.display = 'inline-block';
        output.src = dataURL;

        //CSS PART
        upload_label.style.opacity = 1;
        upload_label.style.border = "solid var(--yellow)";
    };
    reader.readAsDataURL(input.files[0]);
};

//USING CAMERA
camera_button.addEventListener('click', async function () {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    click_label.style.display = 'flex';
    // click_button.style.display = 'block';

    // CSS PART
    start_label.style.opacity = 1;
    start_label.style.border = "solid var(--yellow)";
});

//TAKE PHOTOS

click_button.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    let blob = document.querySelector("#canvas").toBlob(function (blob) {
        file = new File([blob], "test.jpg", { type: "image/jpeg" });
    }, "image/jpeg");

    file = new File([blob], `uploaded${new Date()}.jpg`);

    console.log(file)

    // CSS PART
    click_label.style.opacity = 1;
    click_label.style.border = "solid var(--yellow)";
});


//FETCH POST AFTER CLICKING SUBMIT BUTTON, REDIRECT TO NEXT PAGE AND LOAD GET RESTAURANT FUNC.

UploadForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData();

    if (file !== null) {
        console.log("APPEND 1")
        formData.append('image', file);
    } else if (file == null && form.image.files[0]) {
        console.log("APPEND 2")
        formData.append('image', form.image.files[0])
    } else if (file == null && !form.image.files[0]) {
        console.log("Fail01")
        new swal({
            title: "",
            text: "請重試及上傳食物照片!",
            icon: "error",
        })
        return
    }

    console.log(form.image.files[0]);
    console.log(file);
    console.log(formData.image)

    fetch('/food', {
        method: 'POST',
        body: formData
    })
        .then(
            (result) => result.json()
        )
        .catch(error => ({ error: String(error) }))
        .then(json => {
            if(json.error){
                new swal({
                    title: "請重試及上傳食物照片!",
                    text: json.error,
                    icon: "error",
                })
                return
            }
            console.log(json.chinese_name)
            var foodChineseName = json.chinese_name
            // sessionStorage.setItem('food', foodChineseName)
            let params = new URLSearchParams();
            // params.set('tag',json.tags)
            params.set('name',json.name)
            location.href = '/resultpage.html?' + params
            // window.location.replace('/resultpage.html')
        })
        // .then(setTimeout(()=>{window.location.replace('/resultpage.html')},5000))
            


})









