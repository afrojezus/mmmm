import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <head
                dangerouslySetInnerHTML={{
                    __html: `<!---
XXXXXXXXXXKO0XXXXXXKxOXXXXKKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXOk0XXXXXXX0k0
XXXXXXXXXX0O0XXXXXXKkOXXXX0OKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKkkKXXXXXXXOk
XXXXXXXXXX0OKXXXXXXKkkXXXX0O0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0k0XXXXXXXKk
XXXXXXXXXXOOXXXXXXXXOkKXXXKOOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXOOKXXXXXXXO
XXXXXXXXXKO0XXXXXXXX0k0XXXX0OKXXXXXXXXKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKO0XXXXXXXK
XXXXXXXXXKO0XXXXXXXXKkOXXXXX00XXXXXXXKO0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXOOKXXXXXXX
XXXXXXXXX0OKXXXXXXXXXOx0XXXXK00XXXXXXXOOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKO0XXXXXXX
XXXXXXXXX0OKXXXXXXXXX0dkXXXXXKO0XXXXXX0k0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXOOXXXXXXX
XXXXXXXXX0OKXXXXXXXXX0dd0XXXXXKOKXXXXXX0OKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0OKXXXXXX
XXXXXXXXX0kKXXXXXXXXXkddd0XXXXX0OKXXXXXKO0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKO0KKXXXX
XXXXXXXXX0k0XXXXXXXXKxdolxKXXXXXKO0XXXXXKO0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKO0K0KXXX
XXXXXXXXX0k0XXXXXXXX0dooxkk0XXXXXKO0KXXXXKO0XXXXXXXXXXXXXXXXXXXXXXXXXXKKXXXXXXXXXXXXXXXXXXKKOOKO0XXX
XXXXXXXXXKkOXXXXXXXXOdodOOOk0XXXXXKxxKXXXXKO0XXKKXXXXXXXXXXXXXXXXXXXXXK00XXXXXXXXXXXXXXXXK00OOKOOXXX
XXXXXXXXXKkkXXXXXXXXkoox00XX00KXXXX0xdOXXXXKO0XKOOKKXXXXXXXXXXXXXXXXXXX0kKXXXXXXKKXXXXXXXKO0kOXOOXXX
XXXXXXXXXXkkKXXXXXXKxodk0XNWNK00XXXX0dlxKXXXKO0XKOOOKXXXXXXXXXXXXXXXXXXKkOXXXXXXOOXXXXXXXKO0kOX0OKXX
XXXXXXXXXXOx0XXXXXX0xldOKNWWWWN00KXXXKxlokKXXKOOKKK0O0XXXXXXXXXXXXXXXXXXOx0XXXXXOkKXXXXXX0k0kOX0OKXX
XXXXXXXXXXKkOXXXXXX0dlx0XNWWWWWNX00KXXKkdodkKXK0O0KK0O0KXXXXXXXXXXXXXXXXKxkKXXXX0k0XXXXXXkkOxOX0O0XX
XXXXXXXXXXKkxKXXXXXOook0KXKKXNNWWNK00KXKOxxdxOKXKOOOKKOOKXXXXXXXXXXXXXXXXOdOXXXX0x0XXXXXKxxOokXKO0XX
XXXXXXXXXXXOxOKXXXXOod0XNNXKK000KXXXK00KX0kkkkkO0KK0O0K0O0KXXXXXXXXXXXXXXKdxKXXX0xOXXXXXOdkOokXKkOXX
XXXXXXXKXXKKkkKKXXKOld0NWWWWWWNKK0O0K00O0KKOkO00OOOO0OO00OOKXXXXXXXXXXXXXXxd0XXX0dkXXXXXxdOkdxKKkOXX
KKKKKKKKXKKKkoOXXKKklxKNWWWWWWWWWNXK0OO0O000OkOXXK00OOOOOOOO0KXXXXXXXXXXXX0okXXXOdOXXXX0dxOkkx0KkkXX
KKKKKOOKKKKKkcdKKKKklxXWWWWWWWWWWWWWNNXKKXX00OOOKNNNNX0Okkkkkk0KXXXXXXXXXXKddKXXOdOXXXKxoko:;:kKkkKX
KKKKKOk0KKKKx:lOKKKOokXWWWWWWWWWWWWWWWWWNNWNXK0Ok0KXWWWNXK0Okxdxk0KKKXXXKXKxoOXKxo0XXXOcoo.  .oKkkKX
KKKKK0k0KKKKdcco0KKOdkXWWWWWWWWWWWWWWWWNNWWWWWNXKOOOKNWWWWWNNX0Oxxk0KKKXXXXkcxK0loKKKOc;l'   .cOxkKX
KKKKKKkOKKKKo:ccxKK0dkNWWWWWWWWWWWWWWWWNNWWWWWWWWNNXKKNNWWWWWWWWWN0o;;::ccc:.,c:',cc:,'''..lxxxkxxKK
KKKKKKOkKKK0o:ccoOKKxxXNWWWWWWWWWWWNNNNXXXNWWWWWWWWWWNNWWWWWWWWWWW0;..........'',,,,;;;::;,dX0kxdkKO
KKKKKKOxOKK0o;coxkOKkxKWWWNNKxkK0Okdl:;'.;ONWWWWWWWWWWWWWWWWWWWWWWXOOOkc',;:::::::::::cccl;oXKkdok0d
KKKKKKKkkKK0o;cdOOO0OxOK0Oxl'..''..       ,ONWWWWWWWWWWWWWWWWWWWWWWWWNx;;cccclllllooodddddldXXOolkOl
KKKKKKKOxOK0o;:cllcoOd,...            ...,lONNWWWWWWWWWWWWWWWWWWWWWWW0lcddddddxxxxxxxxxxxolONKxccxxl
KKKKKKK0xx00d;.    .ld'         .....;x0KXNWNNNNNNNNNNNNNNNNNNNNNNNNNkcdxxxxxxxdddddoddoolxXNOolldol
KKKKKKKKkdOKd;.     .l:....'',,;;:::,:ONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNxcodddxxxkkxkkkkkOOO0XNXxoooolo
KKKKKKKK0xx0k:;,..,,;:c:;:::::::cccll:xNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNKOOO0KKKXXKXXXXXXXXXXXXOdolccld
KKKKKKKKKOdkOl:;,::::::;:ccllooodddddldXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXXXKKXXXKKKXKKXXXxool:cod
kKKKKKKKKKkdko,;lllooooooddxxxxxxxxdocxXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXKXXXKKXXXKKXXXXXX0doo::odd
xOKKKKKKKK0xdo;lxxxxxxxxxxxddddddddxxxKXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXKKXXKKXXXKKXXXXXXXkooc:lddd
kk0KK0KK00KOdo:cxxxxddddddxxkkkOO0KXXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNXXXXKXXXXXXXXXXXXKxolcldddd
0xk0K0000000kl;;lddxxkkO00KKXXXXXXXXXXXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXNNNNXXXXOocclooddo
0Oxk0000000KOl:lxO0KKXXKKKKXKKKKXKKXXXXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNKdccoooodol
00OxO00000000dldOXKKKKKK0KXXKKKKKKKXXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNKdcloooooood
O00kxO0000000xdO0KK00KK00KXKK0KXXKXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNX0oclooooooodO
ok00kxO000000kx0XXKKKKK0KXXKKKXXXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNX0xlclccloooldO0
olx00kxO00000kxOXXXXXXKKXXXXXXXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXKOdlccccccoooldO00
OdldO0kxO0000OxkKXXXXXXXXXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNKkdlcclllllloooldO000
00xlok0kdk0000kx0XXXXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNX0xollllloollcoollx0000k
O00kllxOkdk000OxkKXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWNNNNKOxollllllololcclolok000Oxk
ldk0kocokkdxO00xook0KXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXNNNWNNNNNWWNWNX0kdollllcccllllc:clllxO00OxxO0
l:cokOdclxkddO0Odclloxk0KXNNNNNNNNNNNNNNNNNNNNNNNNNNWNNWWNNWWNWWNXKOxolllllc;;:lllc:;;cccok00OxxkO0O
dl:,,lxdlcoxddk0kolollllodxkO0KXNNNNNNNNNNNNWWNNNWWWWWWWWWWWWNX0kdollllc::;,;clc::;,:::cxO0OxxkOOxoc
l::;,';colccoooxOxlcllllllllllokO000KKXXNNNNWWWWWWWWWWWWWWNKOxollllcc:;;;;;;::;;;;;;;:okOkxdxxdoc;;;
xl;;;,,,:ccc::lldOo;;cllcccccclkOOOOkkkOOO000KXNNWWWWWWWNKkolllllc:;;;;;;,;;;;;;;,;,;dOOdldxoc;;;;;; --->`,
                }}
            ></head>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
