
import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import {useRouter} from 'next/router';
import {ButtonSendSticker} from '../src/componentes/ButtonSendStickers';


// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_kEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NzI3OSwiZXhwIjoxOTU4ODYzMjc5fQ.Co6qNUboSoAPL08DDBIsi6oeokMMfHoYnfGkkTL26Ao';
const SUPABASE_URL = 'https://yjosllrksbabbvrcxpqh.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_kEY);


function escutaMensagemEmTempoReal(adicionaMensagem){
    return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => { 
        adicionaMensagem(respostaLive.new);

        })
    .subscribe();
}


export default function ChatPage() {
    
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([
           /* {
                id: 1,
                de: 'Joao-VitorGD1703',
                texto: ':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_3.png',
            }*/
    ]);

    React.useEffect(() => {
        
     supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', {ascending: false})
        .then(({data}) =>{
           setListaDeMensagens(data);
    
        });
        escutaMensagemEmTempoReal((novaMensagem) => {
            setListaDeMensagens((valorAtualDaLista) =>{
                return[
                    novaMensagem,
                    ...valorAtualDaLista,
               ]
             });
            });   
    }, []);
   

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */

    function handleNovaMensagem (novaMensagem) {
        const mensagem = {
           // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };
        supabaseClient
          .from('mensagens')
          .insert([mensagem])
          .then(({data}) => {
              /*setListaDeMensagens([
                data[0],
                ...listaDeMensagens,
           ]);*/
        });
        
           setMensagem('');
    } 

    /*
    const handleNovaMensagem = (novaMensagem) => {
        if(novaMensagem) {
            const mensagem = {
           // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };
        supabaseClient
          .from('mensagens')
          .insert([mensagem])
          .then(({data}) => {
              console.log('Criando Mensagem: ', data);
              setListaDeMensagens([
                data[0],
                ...listaDeMensagens,
           ]);

          });
        setMensagem('');
        }
    }
    
    const copy = () => {
        var content = mensagem;
        navigator.clipboard.writeText(content)
            .then(() => {
                setMensagem('texto copiado')
                setTimeout(() => {
                    setMensagem('');
                }, 1000);
                
            })
            .catch(erro => {
                console.log(erro);
            })
    }*/
  
    

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[200],
                backgroundImage:`url(https://i.imgur.com/TfKh42o.png)`,
                //backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['0000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0px 2px 10px 0px rgb(0 0 0 / 20%)',
                    borderRadius: '30px',
                    backgroundColor: appConfig.theme.colors.neutrals[7000],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[6000],
                        flexDirection: 'column',
                        borderRadius: '20px',
                        padding: '16px',
                    }}
                >
                    <MessageList 
                    mensagens={listaDeMensagens}
                    setMensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    if (mensagem.length > 1) {
                                        handleNovaMensagem(mensagem);
                                      } else {
                                        alert("A campo de mensagem deve estar preenchido");
                                      }
                                    }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '7px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[8000],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[2000],
                                focus: {
                                    border: '1px solid',
                                    borderColor: appConfig.theme.colors.primary['400'],
                                }
                            }}
                        />
                        <ButtonSendSticker
                        onStickerClick={(sticker)=>{
                            console.log('[USANDO O COMPONETE]salva esse sticker no banco');
                            handleNovaMensagem(':sticker:' + sticker);
                        }}
                        />
                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
   
        /*houve a segunda adição de codigo aqui */
    const handleDelete = (mensagem) => {

        if (mensagem.de === appConfig.usuarioLogado) {

            supabaseClient
                .from('mensagens')
                .delete()
                .match({ id: mensagem.id })
                .then(({ data }) => {
                    const messageListFiltered = props.mensagens.filter((messageFiltered) => {
                        return messageFiltered.id != data[0].id;
                       
                    });
                    props.setMensagens(messageListFiltered);
                });
        }
    };
    
    return (
        <Box
            tag="ul"
            styleSheet={{
                //overflowX: 'sroll',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["0000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[7000],
                            }
                        }}
                    >
                        {/* terceira adição de codigo aqui */}
                        <Box
                            onClick={() => {
                                handleDelete(mensagem);
                            }}
                            styleSheet={{
                                marginBottom: '8px',
                                width: 'fit-content',
                                height: 'auto',
                                padding: '4px 8px',
                                position: 'relative',
                                float: 'right',
                                opacity: '50%',
                                borderRadius: '50%',
                                hover: {
                                    cursor: 'pointer',
                                    backgroundColor: appConfig.theme.colors.neutrals[4000],
                                    opacity: '100%',
                                    color: 'white',
                                },
                            }}
                            >x</Box>
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                            }}
                        >
                       

                            
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong"
                           
                           /*abaixo temos a quarta adição de codigo */
                           styleSheet={{
                                margin: '0 10px',
                                hover: {
                                    cursor: 'pointer',
                                    color: appConfig.theme.colors.neutrals[4000],
                                }
                            }}
                            
                            >
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[2000],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                        </Text>
                        </Box>
                           {mensagem.texto.startsWith(":sticker:") ? (
                                <Image
                                style={{
                                  maxWidth: "30%",
                                }}
                               src={mensagem.texto.replace(":sticker:", "")}
                              />
                            ) : (
                                mensagem.texto
                                )}
                          
                          
                          
                           {/*mensagem.texto.startWith(':sticker')
                             ? (
                            <image src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                              )}*/}
                    </Text> 
                );
            })}
        </Box>
    )
}