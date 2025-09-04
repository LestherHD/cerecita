// Audio de fondo que se reproducirá continuamente
let audioFondo = null;

// Define cada "página" con texto - reorganizado para alternar artistas
const paginas = [
  {
    texto: '"No quiero un final feliz, quiero que esto sea para siempre" 3AM-Bombon',
    artista: "3AM"
  },
  {
    texto: '"¿Tú eres para mí, soy para ti? Ya decidí: te quiero a ti, te quiero a ti, te quiero a ti" Ed Maverick-Quiero',
    artista: "Ed Maverick"
  },
  {
    texto: '"Es tan especial para mí, Por qué me hizo sentir que aún tengo qué vivir" Kevin Kaarl-Mujer Distante',
    artista: "Kevin Kaarl"
  },
  {
    texto: '"Quiero ser más que tu amigo… No quiero un final feliz, quiero que to\' sea para siempre" 3AM-Bombon',
    artista: "3AM"
  },
  {
    texto: '"Vamonos a marte donde nadie vaya a buscarte, ni a ti ni a mi" Ed Maverick-Vamos a Marte',
    artista: "Ed Maverick"
  },
  {
    texto: '"No puedo dejar de pensar en ti y nada más, En tus ojos miel, En tu forma de besar, En tu forma de querer" Kevin Kaarl-Si supieras',
    artista: "Kevin Kaarl"
  },
  {
    texto: '"Puede que no tenga mucho, pero cuando estás conmigo tengo to-do" 3AM-Tu me encantas',
    artista: "3AM"
  },
  {
    texto: '"Quiero que sigamos aturrándonos la vida de recuerdos" Ed Maverick-Acurrucar',
    artista: "Ed Maverick"
  },
  {
    texto: '"Dime si tú quieres ir conmigo a todas partes" Kevin Kaarl-dime',
    artista: "Kevin Kaarl"
  },
  {
    texto: '"Hay tantas cosas que puedo pensar al día" 3AM-Distancia',
    artista: "3AM"
  },
  {
    texto: '"Corre, te sigo, Vámonos a cualquier lugar" Ed Maverick-Ropa de Bazar',
    artista: "Ed Maverick"
  },
  {
    texto: '"¿Que si tú me encantas? Tú me tiene\' loco" 3AM-Alma',
    artista: "3AM"
  },
  {
    texto: '"No hay nada que me ponga más feliz, que tu boca empezara a hablar" Ed Maverick-Del Rio',
    artista: "Ed Maverick"
  },
  {
    texto: '"Ya no importa qué tan mal vaya mi día, Sé que va a hacer un buen día, Siempre y cuando te encuentre incluido en él" 3AM-Por ti',
    artista: "3AM"
  },
  {
    texto: '"Quiero saber, si tú, Eres para mí, soy para ti o tú para mí" Ed Maverick-Quiero',
    artista: "Ed Maverick"
  },
  {
    texto: '"Ya decidí, te quiero a ti, te quiero a ti, te quiero a ti" Ed Maverick-Quiero',
    artista: "Ed Maverick"
  },
  {
    texto: '"No debería de estar pensando tanto, este pedo va chido y no quiero cagarlo, no se si realmente le gusto o le agrado, pero chingue a su madre nada pierdo intentando" Ed Maverick-Efeseta',
    artista: "Ed Maverick"
  },
  {
    texto: "Mi vida, falta una cosa que te quiero decir",
    artista: "final"
    // no hay audio
  },
  {
    texto: "No quiero ser solo alguien que te gusta, ni un momento pasajero en tu vida. Quiero ser ese ‘nosotros’ que crece con cada amanecer, que se construye con nuestras risas, nuestras conversaciones y los silencios que compartimos. Quiero estar contigo en las buenas y en las malas, acompañarte en cada caída y celebrar cada triunfo. Aunque la distancia nos separe por momentos, quiero que sepas que siempre estaré presente, sosteniéndote y recordándote que cada día juntos es un capítulo más de nuestra historia. Quiero ser tu refugio y tu compañía, la certeza de que nuestro ‘nosotros’ se escribe con amor, con paciencia y con ganas de nunca dejar de estar.",
    artista: "final"
    // no hay audio
  }
];

let indice = -1;
const btn = document.getElementById("siguiente");
const textoDiv = document.getElementById("texto");

// Iniciar el audio de fondo automáticamente cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  // Intentar iniciar el audio inmediatamente
  iniciarAudioFondo();
  
  // También agregar un listener para el primer clic en la página
  // por si el navegador bloquea el autoplay
  document.addEventListener('click', () => {
    if (!audioFondo || audioFondo.paused) {
      iniciarAudioFondo();
    }
  }, { once: true }); // Solo se ejecuta una vez
});

// Función para inicializar el audio de fondo
function iniciarAudioFondo() {
  if (!audioFondo) {
    // Cambia "buena.mp3" por el nombre de tu archivo de audio
    audioFondo = new Audio('canciones/buena.mp3');
    audioFondo.loop = true; // Para que se repita continuamente
    audioFondo.volume = 0.3; // Volumen más bajo para que no interfiera
    
    audioFondo.play().then(() => {
      console.log("Audio de fondo iniciado correctamente");
    }).catch(err => {
      console.warn("No se pudo reproducir el audio de fondo automáticamente:", err);
      console.log("Se iniciará con el primer clic");
    });
  } else if (audioFondo.paused) {
    audioFondo.play().catch(err => {
      console.warn("Error al reanudar audio:", err);
    });
  }
}

btn.addEventListener("click", () => {
  indice++;
  if (indice < paginas.length) {
    // Actualiza el texto
    textoDiv.innerHTML = `<p>${paginas[indice].texto}</p>`;

    // Si hay audio específico, créalo y reprodúcelo
    if (paginas[indice].audio) {
      const audio = new Audio(`audios/${paginas[indice].audio}`);
      audio.play().catch(err => {
        console.warn("No se pudo reproducir automáticamente:", err);
      });
    }

    // Cambia el botón cuando llegues al final
    if (indice === paginas.length - 1) {
      btn.textContent = "Hecho";
      btn.disabled = true;
      
      // El audio de fondo continúa reproduciéndose hasta el final
      console.log("Llegaste al final, pero la música continúa...");
    }
  }
});
