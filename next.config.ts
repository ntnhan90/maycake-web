/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
    experimental: {
        createMessagesDeclaration: './messages/en.json'
    }
});

const nextConfig:NextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.pokemondb.net',
            port: '',
          },
        ],
    },
}

module.exports = withNextIntl(nextConfig)