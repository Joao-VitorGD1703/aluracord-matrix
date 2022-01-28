import appConfig from '../config.json';
import {Box, Button, Text, TextField, Image } from '@skynexui/components';
//import { urlObjectKeys } from 'next/dist/shared/lib/utils';
import React from 'react';
import {useRouter} from 'next/router';



function Titulo(props) {
    console.log(props);
    const Tag = props.tag;
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
            color: ${appConfig.theme.colors.neutrals['1000']};
            font-size: 24px;
            font-weight: 600;
            
              }  
           `}</style>
           

        </>
    );
}

//componetes React
/*function HomePage() {
    return (
        <div>
            <GlobalStyle />
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <h2>Discord - Alura matrix</h2>


        </div>)
}

export default HomePage*/
export default function PaginaInicial() {
    //const username = 'Joao-VitorGD1703';
    const [username, setUsername] = React.useState('Joao-VitorGD1703');
    const roteamento = useRouter();
  
    return (
      <>
        {/*<GlobalStyle />*/}
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.neutrals[2000],
            backgroundImage: 'url(https://i.imgur.com/TfKh42o.png)',
            //backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply', 
            color: appConfig.theme.colors.neutrals['000']
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '25px', padding: '35px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[6000],
             //backgroundColor: rgba (0, 0, 0, 0.2)
             
            }}
          >
            {/* Formulário */}
            <Box
            
              as="form"
              onSubmit={function (infosDoEvento) {
                  infosDoEvento.preventDefault();
                  console.log('alguém submeteu o form');
                  roteamento.push(`/chat?username=${username}`);
                  //window.location.href = '/chat';
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', 
                
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[2000] }}>
                {appConfig.name}
              </Text>

              {/*<input 
              type="text" 
              value={username}
              onChange={function (event){
                  console.log('usuario digitou', event.target.value);
                const valor = event.target.value;  
                setUsername(valor);
              }}
              />*/}
  
              <TextField
              value={username}
              onChange={function (event){
                console.log('usuario digitou', event.target.value);
                //onde está o valor?
              const valor = event.target.value;  
              //trocar o valor da variavel
              //através do React e avise quem precisa
              setUsername(valor)
            }}
               
              fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[2000],
                    mainColor: appConfig.theme.colors.neutrals[9000],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[8000],
                   
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["0000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[500],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                 
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '20px',
                backgroundColor: appConfig.theme.colors.neutrals[8000],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[9999],
                borderRadius: '20px',
                flex: 1,
                minHeight: '240px',
                
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                //src={`https://github.com/Joao-VitorGD1703.png`}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[2000],
                  backgroundColor: appConfig.theme.colors.neutrals[9000],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }
  
  