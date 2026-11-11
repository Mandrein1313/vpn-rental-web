document.addEventListener("DOMContentLoaded", function () {
  // ปีใน footer
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // เมนูมือถือ
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.querySelector(".nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // ตัวเลขจำลองบนการ์ดฮีโร่ (ไม่ใช่สปีดเทสจริง)
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var dl = document.getElementById("dlSpeed");
  var ul = document.getElementById("ulSpeed");
  if (dl && ul) {
    dl.textContent = rand(80, 220) + " Mbps";
    ul.textContent = rand(40, 120) + " Mbps";
  }

  // ปุ่มเลือกแพ็ก → เลื่อนไปฟอร์ม + เลือก select
  var planSelect = document.getElementById("planSelect");
  document.querySelectorAll("[data-plan]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var plan = btn.getAttribute("data-plan");
      if (planSelect && plan) {
        planSelect.value = plan;
      }
      var contact = document.getElementById("contact");
      if (contact) {
        contact.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ฟอร์ม → สร้างข้อความให้คัดลอก
  var form = document.getElementById("orderForm");
  var result = document.getElementById("formResult");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var contact = (data.get("contact") || "").toString().trim();
      var plan = (data.get("plan") || "").toString().trim();
      var note = (data.get("note") || "").toString().trim();

      var message =
        "สวัสดีครับ สนใจเช่า VPN\n" +
        "ชื่อ: " + name + "\n" +
        "ติดต่อ: " + contact + "\n" +
        "แพ็กเกจ: " + plan + "\n" +
        (note ? "รายละเอียด: " + note + "\n" : "") +
        "ขอบคุณครับ";

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).then(
          function () {
            if (result) {
              result.textContent = "คัดลอกข้อความสั่งซื้อแล้ว — วางใน Line / Telegram ได้เลย";
            }
          },
          function () {
            showFallback(message);
          }
        );
      } else {
        showFallback(message);
      }
    });
  }

  function showFallback(message) {
    window.prompt("คัดลอกข้อความนี้:", message);
    if (result) {
      result.textContent = "คัดลอกข้อความจากกล่องที่เด้งขึ้นมาได้เลย";
    }
  }
});
