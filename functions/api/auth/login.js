export async function onRequestPost({ request, env }) {
    try {
        // 解析前端发来的密码
        const { password } = await request.json();
        
        // 读取 Cloudflare 里设置的 ADMIN_PASSWORD 环境变量进行验证
        if (password === env.ADMIN_PASSWORD) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new Response(JSON.stringify({ success: false }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (err) {
        // 处理请求异常
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
