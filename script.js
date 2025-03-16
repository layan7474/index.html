document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("signup-form"),
        passwordInput = document.getElementById("password"),
        emailInput = document.getElementById("email"),
        firstNameInput = document.getElementById("first_name"),
        secondNameInput = document.getElementById("second_name"),
        logoutBtn = document.getElementById("logout"),
        forgotPasswordBtn = document.getElementById("forgot-password");

    const passwordError = document.createElement("span");
    Object.assign(passwordError.style, { color: "red", fontSize: "14px", marginTop: "5px", display: "none" });
    passwordInput.insertAdjacentElement("afterend", passwordError);

    // هذي دالة عشان تتحقق من صحة الإدخال
    function validateInput(input, pattern, errorMessage, errorElement = null) {
        input.addEventListener("input", function () {
            this.value = this.value.replace(pattern, '');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = pattern.test(this.value) ? "block" : "none";
            }
        });
    }

    //هنا تكون بس بالحروف العربية في الاسم الاول والثاني
    validateInput(firstNameInput, /[^ء-ي]/g);
    validateInput(secondNameInput, /[^ء-ي]/g);

    // هنا تكون بس بالحروف الإنجليزية في البريد وكلمة المرور
    validateInput(emailInput, /[^a-zA-Z0-9@._-]/g);
    validateInput(passwordInput, /[^a-zA-Z0-9@._-]/g);

    // هنا عشان اتحقق من قوة كلمة المرور
    passwordInput.addEventListener("input", function () {
        const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        passwordError.textContent = "يجب أن تحتوي كلمة المرور على:\n- حرف كبير\n- حرف صغير\n- رقم\n- أحد الرموز (@$!%*?&)\n- لا تقل عن 8 خانات";
        passwordError.style.display = pattern.test(passwordInput.value) ? "none" : "block";
    });

    // هذا زر انشاء مستخدم 
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = {
            firstName: firstNameInput.value.trim(),
            secondName: secondNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        if (users.some(u => u.email === user.email)) {
            return alert("❌ البريد الإلكتروني مستخدم بالفعل!");
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("✅ تم إنشاء الحساب بنجاح!");
        form.reset();
        passwordError.style.display = "none";
    });

    //هذا زر تسجيل الخروج
    logoutBtn.addEventListener("click", () => {
        if (confirm("⚠️ هل أنت متأكد من تسجيل الخروج؟")) {
            alert("✅ تم تسجيل الخروج بنجاح!");
            history.replaceState(null, null, "blank.html");
            window.location.href = "blank.html";
        }
    });

    //هذا نسيت كلمة المرور فيعيد كلمة المرور
    forgotPasswordBtn.addEventListener("click", function () {
        let email = prompt("📧 أدخل بريدك الإلكتروني لاستعادة كلمة المرور:");
        if (!email) return;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.email === email);
        alert(user ? `🔑 كلمة المرور الخاصة بك: ${user.password}` : "🚫 البريد الإلكتروني غير مسجل!");
    });
});
