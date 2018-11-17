/**
 * redux-auth-wrapper 的 UserAuthWrapper 高阶函数
 */
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'
// import debug from 'debug'

// const log = debug('app:util:authWrappers')

/**
 * 验证用户已经通过验证
 * @type {object} configObject
 * selector ,获取 authData数据
 */
export const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.authUser,
    /**
     * 发起验证请求还没有证明正在认证成功
     */
    authenticatingSelector: state => state.authUser && state.authUser.fetching,
    predicate: auth => auth.accessToken && auth.currentUserId,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
})

/**
 * 验证用户未经通过验证
 * @type {object} configObject
 */
export const UserIsNotAuthenticated = UserAuthWrapper({
    authSelector: state => state.authUser,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    predicate: auth => !auth.accessToken || !auth.currentUserId,
    failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/dashboard',
    allowRedirectBack: false
})