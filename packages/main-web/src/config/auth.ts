/**
 * 认证相关配置
 */

// 会话保持时间配置（可根据需求调整）
export const AUTH_CONFIG = {
    // 默认会话保持时间：7天（单位：毫秒）
    SESSION_DURATION: 7 * 24 * 60 * 60 * 1000,

    // 可选的其他时间配置
    SESSION_DURATIONS: {
        ONE_HOUR: 60 * 60 * 1000,           // 1小时
        ONE_DAY: 24 * 60 * 60 * 1000,       // 1天
        THREE_DAYS: 3 * 24 * 60 * 60 * 1000, // 3天
        ONE_WEEK: 7 * 24 * 60 * 60 * 1000,  // 7天（默认）
        TWO_WEEKS: 14 * 24 * 60 * 60 * 1000, // 14天
        ONE_MONTH: 30 * 24 * 60 * 60 * 1000  // 30天
    },

    // 游客账号配置
    GUEST_CONFIG: {
        DEFAULT_ROLE: 'user', // 游客默认进入的角色端
        TOKEN_PREFIX: 'guest-token-',
        USERNAME_PREFIX: 'guest_'
    },

    // 角色路径映射
    ROLE_PATH_MAP: {
        designer: '/designer',
        supplier: '/supplier',
        contractor: '/contractor',
        user: '/user'
    } as Record<string, string>
}

/**
 * 修改会话保持时间
 * 使用方法：在需要的地方调用此函数来更改会话时间
 * 例如：setSessionDuration(AUTH_CONFIG.SESSION_DURATIONS.ONE_DAY)
 */
export const setSessionDuration = (duration: number) => {
    AUTH_CONFIG.SESSION_DURATION = duration
    console.log(`会话保持时间已更新为: ${duration / (24 * 60 * 60 * 1000)} 天`)
}
