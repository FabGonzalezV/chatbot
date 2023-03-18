// Crear un objeto de reconocimiento de voz
const recognition = new webkitSpeechRecognition();
recognition.lang = "es-MX";
recognition.interimResults = false;

recognition.onend = (event) => {
  recognition.start();
};
// Agregar un evento de resultado para manejar los resultados del reconocimiento de voz
recognition.onresult = function (event) {
  const last = event.results.length - 1;
  const phrase = event.results[last][0].transcript;
  const regex = /alexa/i; // Expresión regular para buscar el patrón
  if (regex.test(phrase)) {
    console.log(phrase + ": ");
    generarRespuesta(phrase);
  }
};
/////////////////////7
async function generarRespuesta(phrase) {
  const entradaTexto = phrase;
  const respuesta = await fetch(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer  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",
      },

      body: JSON.stringify({
        prompt: `La siguiente es una conversación entre un humano 
        y una IA. El humano dice: ${entradaTexto}\n`,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
    }
  );
  const respuestaJSON = await respuesta.json();
  const respuestaGenerada = respuestaJSON.choices[0].text;
  const oraciones = respuestaGenerada.split(" ");
  let nuevaFrase = "";
  let contador = 0;
  let nuevaOracion = new Array();

  const synthesis = window.speechSynthesis;
  const mexicanSpanishVoice = synthesis
    .getVoices()
    .find((voice) => voice.lang === "es-MX");
  console.log(respuestaGenerada);

  if (oraciones.length <= 15) {
    const voice = new SpeechSynthesisUtterance(respuestaGenerada);
    voice.voice = mexicanSpanishVoice;
    voice.rate = 1;
    voice.pitch = 1.3;
    synthesis.speak(voice);
  } else {
    for (let i = 1; i < oraciones.length; i++) {
      if (contador <= 13) {
        nuevaFrase += oraciones[i] + " ";
        contador++;
      } else {
        nuevaFrase += oraciones[i] + " ";
        nuevaOracion.push(nuevaFrase);
        nuevaFrase = " ";
        contador = 0;
      }
      if (i == oraciones.length - 1 && contador <= 13) {
        nuevaFrase += oraciones[i] + " ";
        nuevaOracion.push(nuevaFrase);
        nuevaFrase = " ";
        contador = 0;
      }
    }

    for (const i of nuevaOracion) {
      const voice = new SpeechSynthesisUtterance(i);
      voice.voice = mexicanSpanishVoice;
      voice.rate = 1;
      voice.pitch = 1.3;
      synthesis.speak(voice);
    }
  }

  //   voice.onend = function (event) {
  //   alert("Finished in " + event.elapsedTime + " seconds.");
  // };

  // if (synthesis.speaking) {
  //   //synthesis.resume();
  //   console.log("hablando");
  // }
}
// Iniciar el reconocimiento de voz
recognition.start();
