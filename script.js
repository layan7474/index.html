document.addEventListener("DOMContentLoaded", function () {
    // تعريف المتغيرات مع تحديد أنواعها
    var form = document.getElementById("signup-form");
    var passwordInput = document.getElementById("password");
    var emailInput = document.getElementById("email");
    var firstNameInput = document.getElementById("first_name");
    var secondNameInput = document.getElementById("second_name");
    var logoutBtn = document.getElementById("logout");
    var forgotPasswordBtn = document.getElementById("forgot-password");
    if (!form || !passwordInput || !emailInput || !firstNameInput || !secondNameInput || !logoutBtn || !forgotPasswordBtn) {
        console.error("بعض العناصر غير موجودة في DOM");
        return;
    }
    // إنشاء عنصر لرسالة الخطأ
    var passwordError = document.createElement("span");
    Object.assign(passwordError.style, {
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
        display: "none",
    });
    passwordInput.insertAdjacentElement("afterend", passwordError);
    // دالة للتحقق من صحة الإدخال
    function validateInput(input, pattern, errorMessage, errorElement) {
        input.addEventListener("input", function () {
            this.value = this.value.replace(pattern, '');
            if (errorElement && errorMessage) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = pattern.test(this.value) ? "block" : "none";
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
        var pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        passwordError.textContent = "يجب أن تحتوي كلمة المرور على:\n- حرف كبير\n- حرف صغير\n- رقم\n- أحد الرموز (@$!%*?&)\n- لا تقل عن 8 خانات";
        passwordError.style.display = pattern.test(passwordInput.value) ? "none" : "block";
    });
    // زر إنشاء مستخدم
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        var user = {
            firstName: firstNameInput.value.trim(),
            secondName: secondNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };
        if (users.some(function (u) { return u.email === user.email; })) {
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
    logoutBtn.addEventListener("click", function () {
        if (confirm("⚠️ هل أنت متأكد من تسجيل الخروج؟")) {
            alert("✅ تم تسجيل الخروج بنجاح!");
            history.replaceState(null, "", "blank.html");
            window.location.href = "blank.html";
        }
    });
    // زر "نسيت كلمة المرور"
    forgotPasswordBtn.addEventListener("click", function () {
        var email = prompt("📧 أدخل بريدك الإلكتروني لاستعادة كلمة المرور:");
        if (!email)
            return;
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        var user = users.find(function (u) { return u.email === email; });
        alert(user ? "\uD83D\uDD11 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643: ".concat(user.password) : "🚫 البريد الإلكتروني غير مسجل!");
    });
});
     //زر الطقس
  const apiKey = "26004d0fc2ea8a0ea67931b13c97cb67"; // ← احط مفتاح API هنا
  document.getElementById("get-weather").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value.trim();
  const result = document.getElementById("weather-result");

  if (!city) {
    result.textContent = "⚠️ من فضلك أدخل اسم المدينة.";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ar`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      result.textContent = "❌ لم يتم العثور على المدينة.";
    } else {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      result.textContent = `🌤️ الطقس في ${city}: ${desc} - ${temp}°C`;
    }
  } catch (error) {
    result.textContent = "🚫 حدث خطأ أثناء جلب الطقس.";
  }
});
