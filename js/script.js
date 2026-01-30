// IP (placeholder) 
//document.getElementById('ip').textContent = '127.0.0.1';
fetch('https://api.ipify.org?format=json')
  .then(res => res.json())
  .then(ipData => {
    const ip = ipData.ip;
    document.getElementById('ip').textContent = ip;

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(loc => {
        const cidade = loc.city || '';
        document.getElementById('city').textContent = cidade;
      })
      .catch(() => {
        document.getElementById('city').textContent = '';
      });
  })
  .catch(() => {
    document.getElementById('ip').textContent = 'Indisponível';
    document.getElementById('city').textContent = '';
  });



// Hora e data
function atualizarHora() {
  const agora = new Date();

  const hora = agora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const data = agora.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  });

  document.getElementById('hora').textContent = hora;
  document.getElementById('data').textContent = data;
}

// Percentual do dia
function atualizarDiaUtil() {
  const agora = new Date();

  const inicio = new Date();
  inicio.setHours(8, 0, 0, 0);

  const fim = new Date();
  fim.setHours(17, 0, 0, 0);

  let percentual = 0;

  if (agora <= inicio) {
    percentual = 0;
  } else if (agora >= fim) {
    percentual = 100;
  } else {
    percentual = ((agora - inicio) / (fim - inicio)) * 100;
  }

  percentual = Math.floor(percentual);

  document.getElementById('percentual').textContent = percentual + '%';
  document.getElementById('barra').style.width = percentual + '%';
}



atualizarHora();
atualizarDiaUtil();

setInterval(() => {
  atualizarHora();
  atualizarDiaUtil();
}, 1000);


// Pesquisa
const searchInput = document.getElementById('search');

if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (!query) return;

      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.location.href = url;
    }
  });
}
