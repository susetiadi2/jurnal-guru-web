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
        const response = await fetch("https://script.google.com/macros/s/AKfycbwaLMPuN2ROiT62LxkjtGrZnCvYW5J1dZnZ7be4Sz9HRAN-4iCMm_V6Ws4kG5n23-8EGA/exec", {
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
