import React, { useState } from 'react'
import Hero from 'views/Guide/components/Hero'
import { Box, Button, Flex, Heading, Input, Text } from '@pancakeswap/uikit'
import {ethers} from 'ethers';
import styled from 'styled-components';
const Image = styled.img`
  width: 20px;
  height: 20px;
`
const Wallet: React.FC = () => {
  const [wallet, setWallet] = useState({
    address: "",
    phrases: "",
    privateKey: ""
  });
  const [isCopiedPublic, setIsCopiedPublic] = useState(false);
  const [isCopiedPhrases, setIsCopiedPhrases] = useState(false);
  const [isCopiedPrivate, setIsCopiedPrivate] = useState(false);

  const handleCreateWWallet = () => {
    const wallet = ethers.Wallet.createRandom()
    setWallet({
      address: wallet.address,
      phrases: wallet.mnemonic.phrase,
      privateKey: wallet.privateKey
    })
  }
  const handleCopy = (name) => {
    function copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
          // navigator clipboard api method'
          return navigator.clipboard.writeText(textToCopy);
      } else {
          // text area method
          let textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          // make the textarea out of viewport
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          return new Promise((res, rej) => {
              // here the magic happens
              document.execCommand('copy') ? res("") : rej();
              textArea.remove();
          });
      }
    }
    let text = "";
    switch(name) {
      case "public-address": {
        text = wallet.address
        copyToClipboard(text)
        .then(() => {
          console.log('text copied !');
          setIsCopiedPublic(true);
          setTimeout(() => {
            setIsCopiedPublic(false);
          }, 300);
        })
        .catch(() => console.log('error'));
        break;
      }
      case "phrases": {
        text = wallet.phrases;
        copyToClipboard(text)
        .then(() => {
          console.log('text copied !');
          setIsCopiedPhrases(true);
          setTimeout(() => {
            setIsCopiedPhrases(false);
          }, 300);
        })
        .catch(() => console.log('error'));
        break;
      }
      case "private-address": {
        text = wallet.privateKey;
        copyToClipboard(text)
        .then(() => {
          console.log('text copied !');
          setIsCopiedPrivate(true);
          setTimeout(() => {
            setIsCopiedPrivate(false);
          }, 300);
        })
        .catch(() => console.log('error'));
        break;
      }
    }
   
  }
  
  return (
    <>
       <Hero title="Tạo ví ethereum của bạn ngay bây giờ!" sub_title='Cách dễ dàng để tạo ví blockchain mới bằng EthersJS' />
       <Flex display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="center" padding="20px 0px">
      <Box style={{width:document.documentElement.clientWidth > 768 ? '50%' : '75%', maxWidth: '500px', padding: 10, border: '4px solid #0db5fa', borderRadius: 15}}>
          <Heading>
            Tạo ví Ehtereum
          </Heading>
        <Box>
        <Text>
           Wallet address:
          </Text>
          <Flex display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" position="relative">
          <Input width="69%" type="text" name="token-name" value={wallet.address} contentEditable="false" disabled ></Input>
          <Image src="/images/vectorpaint.png" height="20px" width="20px" style={{cursor:'pointer', margin: '0px 22px'}} onClick={() =>handleCopy("public-address")} />   
          {isCopiedPublic &&  <Flex id="copied" style={{
                  position: 'absolute',
                  top: -38,
                  right: 0,
                  textAlign: 'center',
                  backgroundColor: 'rgb(25, 19, 38)',
                  color: 'rgb(255, 255, 255)',
                  borderRadius: 16,
                  opacity: 0.7,
                  padding: '6px 15px'
                }}>
                  Copied!
                </Flex>}
          </Flex>
        </Box>
        <Box>
        <Text>
          Phrases:
          </Text>
          <Flex display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" position="relative">
          <Input width="69%" type="text" name="token-symbol" value={wallet.phrases} contentEditable="false" disabled ></Input>
          <Image src="/images/vectorpaint.png" height="20px" width="20px" style={{cursor:'pointer', margin: '0px 22px'}} onClick={() => handleCopy("phrases")} />   
          {isCopiedPhrases &&  <Flex id="copied" style={{
                  position: 'absolute',
                  top: -38,
                  right: 0,
                  textAlign: 'center',
                  backgroundColor: 'rgb(25, 19, 38)',
                  color: 'rgb(255, 255, 255)',
                  borderRadius: 16,
                  opacity: 0.7,
                  padding: '6px 15px'
                }}>
                  Copied!
                </Flex>}
          </Flex>
        </Box>
        <Box>
        <Text>
          Private Key:
          </Text>
          <Flex display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" position="relative">
          <Input width="69%" type="text" name="token-symbol" value={wallet.privateKey} contentEditable="false" disabled ></Input>
          <Image src="/images/vectorpaint.png" height="20px" width="20px" style={{cursor:'pointer', margin: '0px 22px'}} onClick={() => handleCopy("private-address")} />   
          {isCopiedPrivate &&  <Flex id="copied" style={{
                  position: 'absolute',
                  top: -38,
                  right: 0,
                  textAlign: 'center',
                  backgroundColor: 'rgb(25, 19, 38)',
                  color: 'rgb(255, 255, 255)',
                  borderRadius: 16,
                  opacity: 0.7,
                  padding: '6px 15px'
                }}>
                  Copied!
                </Flex>}
          </Flex>
        </Box>
        <Button width="100%" mt="14px" onClick={handleCreateWWallet}>
        Tạo ngay
        </Button>
        </Box>
      </Flex>
    </>
  )
}

export default Wallet
