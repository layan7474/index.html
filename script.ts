document.addEventListener("DOMContentLoaded", function () {
    // تعريف المتغيرات مع تحديد أنواعها
    const form = document.getElementById("signup-form") as HTMLFormElement | null;
    const passwordInput = document.getElementById("password") as HTMLInputElement | null;
    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    const firstNameInput = document.getElementById("first_name") as HTMLInputElement | null;
    const secondNameInput = document.getElementById("second_name") as HTMLInputElement | null;
    const logoutBtn = document.getElementById("logout") as HTMLButtonElement | null;
    const forgotPasswordBtn = document.getElementById("forgot-password") as HTMLButtonElement | null;

    if (!form || !passwordInput || !emailInput || !firstNameInput || !secondNameInput || !logoutBtn || !forgotPasswordBtn) {
        console.error("بعض العناصر غير موجودة في DOM");
        return;
    }

    // إنشاء عنصر لرسالة الخطأ
    const passwordError = document.createElement("span");
    Object.assign(passwordError.style, {
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
        display: "none",
    });

    passwordInput.insertAdjacentElement("afterend", passwordError);

    // دالة للتحقق من صحة الإدخال
    function validateInput(input: HTMLInputElement, pattern: RegExp, errorMessage?: string, errorElement?: HTMLSpanElement): void {
        input.addEventListener("input", function () {
            this.value = this.value.replace(pattern, '');
            if (errorElement && errorMessage) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = this.value.match(pattern) ? "block" : "none";
            }            
        });
    }

    // السماح فقط بالحروف العربية في الاسم الأول والثاني
    validateInput(firstNameInput, /[^ء-ي]/g);
    validateInput(secondNameInput, /[^ء-ي]/g);

    // السماح فقط بالحروف الإنجليزية والأرقام وعلامات البريد الإلكتروني في البريد وكلمة المرور
    validateInput(emailInput, /[^a-zA-Z0-9@._-]/g);
    validateInput(passwordInput, /[^a-zA-Z0-9@._-]/g);

    // التحقق من قوة كلمة المرور
    passwordInput.addEventListener("input", function () {
        const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        passwordError.textContent = "يجب أن تحتوي كلمة المرور على:\n- حرف كبير\n- حرف صغير\n- رقم\n- أحد الرموز (@$!%*?&)\n- لا تقل عن 8 خانات";
        passwordError.style.display = pattern.test(passwordInput.value) ? "none" : "block";
    });

    // زر إنشاء مستخدم
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let users: Array<{ firstName: string; secondName: string; email: string; password: string }> =
        JSON.parse(localStorage.getItem("users") || "[]");
    
        let user = {
            firstName: firstNameInput.value.trim(),
            secondName: secondNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        if (users.some(u => u.email === user.email)) {
            alert("❌ البريد الإلكتروني مستخدم بالفعل!");
            return;
        }

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("✅ تم إنشاء الحساب بنجاح!");
        form.reset();
        passwordError.style.display = "none";
    });

    // زر تسجيل الخروج
    logoutBtn.addEventListener("click", () => {
        if (confirm("⚠️ هل أنت متأكد من تسجيل الخروج؟")) {
            alert("✅ تم تسجيل الخروج بنجاح!");
            history.replaceState(null, "", "blank.html");
            window.location.href = "blank.html";
        }
    });

    // زر "نسيت كلمة المرور"
    forgotPasswordBtn.addEventListener("click", function () {
        let email = prompt("📧 أدخل بريدك الإلكتروني لاستعادة كلمة المرور:");
        if (!email) return;

        let users: { firstName: string; secondName: string; email: string; password: string }[] = 
            JSON.parse(localStorage.getItem("users") || "[]");

            let user = users.find(u => u.email === email);
            alert(user ? `🔑 كلمة المرور الخاصة بك: ${user.password}` : "🚫 البريد الإلكتروني غير مسجل!");
    });
});

