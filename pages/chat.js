
import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    /*return (
        <div>Página do Chat</div>
    )*/
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

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
    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagens.length + 1,
            de: 'Joao-VitorGD1703',
            texto: novaMensagem,
        };

        setListaDeMensagens([
             mensagem,
             ...listaDeMensagens,
        ]);
        setMensagem('');
    }
    function handleDeleteMessage(event){
        const mensagemId = number(event.target.dataset.id)
        const listaDeMensagensFiltrada = listaDeMensagens.filter(
            listaDeMensagensFiltrada =>{
                return listaDeMensagensFiltrada.id != mensagemId
            }

        )
        setListaDeMensagens(listaDeMensagensFiltrada)
    }

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
                    handleDeleteMessage={handleDeleteMessage} />
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
                                    handleNovaMensagem(mensagem);
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
                            }}
                        />
                        <Icon
                        label= 'icon Component'
                        name='FaRegPaperPlane'
                        size= '35px'
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[1000],
                            height: '16px',
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
    const handleDeleteMessage = props.handleDeleteMessage
    
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

                    //onClick = {(e) => handleDeleteMessage(e, message.id)}
                           
                           
                            /* const handleDeleteMessage = (e, messageId) =>{
                                e.preventDefault();
                                const deletedList = messageList.filter(
                                    (message)=> message.id ==! messageId
                                );
                                setMessageList(deletedList);

                            }*/
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
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
                            <Text tag="strong">
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
                        <text
                        onClick={handleDeleteMessage}
                        styleSheet={{
                            fontSize: '10px',
                            fontWeight: 'auto',
                            marginLeft: 'auto',
                            color: appConfig.theme.colors.neutrals['2000'],
                            background: appConfig.theme.colors.neutrals['5000'],
                            width: '20px',
                            height: '20px',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                        tag="span"
                        data-id={mensagem.id}
                        />
                    
                        </Box>
                        {mensagem.texto}
                    </Text>
                    
                );
            })}
        </Box>
    )
}