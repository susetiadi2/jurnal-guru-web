firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("user-info").innerText = "Login sebagai: " + user.email;

    const form = document.getElementById("jurnalForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        uid: user.uid,
        email: user.email,
        kelas: document.getElementById("kelas").value,
        mapel: document.getElementById("mapel").value,
        jurnal: document.getElementById("jurnal").value,
        refleksi: document.getElementById("refleksi").value
      };

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxSZQSIaqfRdd150RPxrymmluc8sZ8SE2cp6r7o0XOLrFqNlE8D0Jbt-liiXkHD9GKQSw/exec", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const text = await response.text();
        document.getElementById("status").innerText = "Jurnal berhasil disimpan!";
        form.reset();
      } catch (err) {
        document.getElementById("status").innerText = "Gagal menyimpan jurnal.";
      }
    });
  }
});

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}
