/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com"
            },
            //Development
            {
                hostname: "qphlqcgpoiqlcykapfsz.supabase.co"
            },
            //Production
            {
                hostname: "tudvhqxmfdaevrdjxqhu.supabase.co"
            }
        ]
    }
}

module.exports = nextConfig
