// Run the celebration when page loads
window.onload = function () {
  celebrate();
};

function celebrate() {
  // Show the animated text
  document.getElementById("hurrayText").style.display = "block";

  // Fire confetti from multiple angles
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });

  // Additional confetti bursts
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
  }, 250);

  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, 400);

  // Hide after 3 seconds
  setTimeout(() => {
    document.getElementById("hurrayText").style.display = "none";
  }, 3000);
}


 // Function to extract UUID from hash URL
 function getUuidFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#guest/')) {
      return hash.split('/')[1];
  }
  return null;
}

// Function to fetch and display guest data
async function loadGuestData(uuid) {
  try {
      const apiUrl = `https://api.loveliketa25.com.ng/invitee/${uuid}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
          throw new Error('Guest not found');
      }
      
      const data = await response.json();
      document.getElementById('fullName').textContent = data.fullName;
      document.getElementById('fullName').classList.remove('loading');
      
      // Trigger confetti
      confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
      });
  } catch (error) {
      console.error('Error:', error);
      document.getElementById('fullName').textContent = 'Are you invited?';
      document.getElementById('fullName').classList.add('error');
  }
}

// Handle page load and hash changes
function handleHashChange() {
  const uuid = getUuidFromHash();
  if (uuid) {
      loadGuestData(uuid);
  } else {
      // Redirect or show default content
      document.getElementById('fullName').textContent = 'Invalid invitation link';
      document.getElementById('fullName').classList.add('error');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', handleHashChange);
window.addEventListener('hashchange', handleHashChange);


// // Add this inside loadGuestData function after successful fetch
// const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}`;
// const qrCodeImg = document.createElement('img');
// qrCodeImg.src = qrCodeUrl;
// qrCodeImg.alt = "Invitation QR Code";
// qrCodeImg.style.margin = '20px auto';
// qrCodeImg.style.display = 'block';
// document.querySelector('main').appendChild(qrCodeImg);