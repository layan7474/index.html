class ContactForm {
    // Constructor عشان يتم تهيئة الفئة
    constructor() {
        this.bindEvents();
        this.loadData();
    }

    // Method لحفظ البيانات في localStorage
    saveData() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const role = document.getElementById("role").value;
        const messageType = document.getElementById("rol").value;
        const topic = document.getElementById("topic").value;
        const message = document.getElementById("message").value;

        if (!name || !email || !role || !messageType || !topic || !message) {
            alert("الرجاء ملء جميع الحقول قبل الإرسال.");
            return;
        }

        const formData = {
            name: name,
            email: email,
            role: role,
            messageType: messageType,
            topic: topic,
            message: message
        };

        localStorage.setItem("contactFormData", JSON.stringify(formData));
        alert("تم حفظ البيانات بنجاح!");
    }

    // Method عشان تمسح الحقول 
    clearForm() {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("role").value = "";
        document.getElementById("rol").value = "";
        document.getElementById("topic").value = "";
        document.getElementById("message").value = "";
    }

    // Method لتحميل البيانات من localStorage
    loadData() {
        const savedData = localStorage.getItem("contactFormData");
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById("name").value = formData.name;
            document.getElementById("email").value = formData.email;
            document.getElementById("role").value = formData.role;
            document.getElementById("rol").value = formData.messageType;
            document.getElementById("topic").value = formData.topic;
            document.getElementById("message").value = formData.message;
        }
    }

    // Method عشان تربط الأحداث
    bindEvents() {
        document.getElementById("send").addEventListener("click", () => {
            this.saveData();
            this.clearForm();
        });
    }
}

//عشان تنشأ كائن من الفئة
const contactForm = new ContactForm();