<template>
    <div>
        <!-- 顶部导航栏 -->
        <nav class="navbar navbar-light">
            <div class="container">
                <nuxt-link class="navbar-brand" to="index.html">conduit</nuxt-link>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <nuxt-link class="nav-link active" to="/">Home</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/edit">
                            <i class="ion-compose"></i>&nbsp;New Post
                        </nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/setting">
                            <i class="ion-gear-a"></i>&nbsp;Settings
                        </nuxt-link>
                    </li>
                    <template v-if="user">
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="`/profile/${user.username}`">
                                <img class="user-pic" :src="user.image">
                                {{user.username}}
                            </nuxt-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
        <!-- 顶部导航栏 -->

        <!-- 子路由 -->
        <nuxt-child />

        <!-- 底部 -->
        <footer>
            <div class="container">
                <nuxt-link to="/" class="logo-font">conduit</nuxt-link>
                <span class="attribution">
                    An interactive learning project from
                    <nuxt-link to="https://thinkster.io">Thinkster</nuxt-link>. Code &amp;
                    design licensed under MIT.
                </span>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'layoutIndex',
    computed: {
        ...mapState(['user'])
    }
};
</script>

<style>
</style>