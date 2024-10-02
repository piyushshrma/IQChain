// _document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Add DiamNet SDK via CDN */}
                <script src="https://cdn.jsdelivr.net/npm/diamnet-sdk"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
