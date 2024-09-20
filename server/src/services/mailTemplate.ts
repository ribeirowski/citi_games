interface Theme {
    colors: {
      text: string;
      text2: string;
      white: string;
      black: string
;     gray1: string;
      gray2: string;
      gray3: string;
      blue1: string;
      blue2: string;
      green1: string;
      green2: string;
      green3: string;
      purple: string;
      red: string;
    };
    font: string;
  }
  
  // Exemplo de uso
  const theme: Theme = {
    colors: {
      text: "#e1e1e6",
      text2: '#FFFAFA',
      white: "#FFFFFF",
      black: 'black',
      gray1: "#F5F5F5",
      gray2: "#DEDEDE",
      gray3: "#F5F5F566",
      blue1: "#D2EFFE",
      blue2: "#58CBFB",
      green1: "#E2F4EC",
      green2: "#D0F4E4",
      green3: "#51E678",
      purple: "#D5C6FA",
      red: "#EA394A"
    },
    font: "400 16px 'Barlow', sans-serif"
  };
  
export const MailTemplate = (username: string, nameMatch: string, date: string, time: string, platform: string, linkMatch: string) => {
    return `
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Confirmação de Presença</title>
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Barlow', sans-serif;
                background-color: ${theme.colors.gray1};
                color: ${theme.colors.text2};
                margin: 0;
                padding: 20px;
            }
            h1 {
                color: ${theme.colors.blue2};
            }
            p {
                line-height: 1.5;
                color: ${theme.colors.text2};   
            }
            a {
                color: ${theme.colors.green3};
                text-decoration: none;
                font-weight: bold;
            }
            a:hover {
                text-decoration: underline;
            }
            .container {
                background-color: ${theme.colors.black};
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px ${theme.colors.gray3};
            }
            .highlight {
                color: ${theme.colors.blue2};
            }
            span {
                color: ${theme.colors.green3};
            }
            footer {
                margin-top: 20px;
                text-align: center;
                font-size: 0.8rem;
                padding: 10px;
                background-color: ${theme.colors.gray3};
                color: ${theme.colors.white};
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content"> <h1>Olá, ${username}!</h1>
            <p>Você está confirmado na partida de <strong class="highlight">${nameMatch}</strong>.</p>
            <p>Sua sessão será na data <span>${date}</span> às <span>${time}</span></p>
            <p>Para acessar a partida na plataforma <strong class="highlight">${platform}</strong>, clique no link: <a href="${linkMatch}">Acessar Partida</a></p>
            <p>Estamos ansiosos para vê-lo lá!</p>
            </div>
            
            <footer>Made with 💚 and &lt;/&gt; by Squad Ênio 🐧</footer>
        </div>
    </body>
    </html>
    `;
}
