// Page Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageId).classList.add("active");

  // Animate page entrance
  gsap.fromTo(
    `#${pageId}`,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
  );

  // Animate info cards if present
  const infoCards = document.querySelectorAll(
    `#${pageId} .info-card, #${pageId} .feature-card`
  );
  if (infoCards.length > 0) {
    gsap.fromTo(
      infoCards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
      }
    );
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  mobileMenu.classList.toggle("active");
  menuBtn.classList.toggle("active");

  // Animate menu button
  const spans = menuBtn.querySelectorAll("span");
  if (mobileMenu.classList.contains("active")) {
    gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3 });
    gsap.to(spans[1], { opacity: 0, duration: 0.3 });
    gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3 });
  } else {
    gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
    gsap.to(spans[1], { opacity: 1, duration: 0.3 });
    gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
  }
}

// BMI Calculator
document.getElementById("bmiForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("userName");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");

  const name = nameInput.value.trim();
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    alert("Zəhmət olmasa düzgün məlumat daxil edin.");
    return;
  }

  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  let category = "";
  let description = "";

  if (bmi < 18.5) {
    category = "Arıq";
    description =
      "Çəkiniz azdır. Sağlam çəkiyə çatmaq üçün balanslı qidalanmaya diqqət edin.";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal";
    description = "BMI-niz normaldır. Sağlam həyat tərzinə davam edin!";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Artıq çəki";
    description =
      "Artıq çəkiniz var. Fiziki aktivliyi artırmaq və qidalanmanı tənzimləmək tövsiyə olunur.";
  } else {
    category = "Piylənmə";
    description =
      "BMI yüksəkdir. Sağlamlıq riski arta bilər, mütəxəssisə müraciət etməyiniz tövsiyə olunur.";
  }

  // Update result
  document.getElementById("bmiValue").textContent = `BMI: ${bmi}`;
  document.getElementById(
    "bmiCategory"
  ).textContent = `Kateqoriya: ${category}`;
  document.getElementById("bmiDescription").textContent = description;
  document.getElementById("userGreeting").textContent = name
    ? `Salam, ${name}!`
    : "";

  // Animate result section
  const resultSection = document.getElementById("result");
  gsap.fromTo(
    resultSection,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
  );

  // Alert
  Swal.fire({
    title: `Salam, ${name || "İstifadəçi"}!`,
    html: `<b>BMI nəticəniz:</b> ${bmi} <br><b>Kateqoriya:</b> ${category} <br><i>${description}</i>`,
    icon: "info",
    confirmButtonText: "Bağla",
    background: "#f9f9f9",
    confirmButtonColor: "#3085d6",
    customClass: {
      title: "swal2-title",
      htmlContainer: "swal2-html-container",
    },
  });

  // Reset form
  document.getElementById("bmiForm").reset();
});

// Optional: Close mobile menu if user clicks outside
document.addEventListener("click", function (e) {
  const menu = document.getElementById("mobileMenu");
  const button = document.querySelector(".mobile-menu-btn");
  if (!menu.contains(e.target) && !button.contains(e.target)) {
    if (menu.classList.contains("active")) {
      toggleMobileMenu();
    }
  }
});
