<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>

                    <form @submit.prevent="update">
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="image" class="form-control" type="text" placeholder="URL of profile picture">
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea v-model="bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="email" class="form-control form-control-lg" type="email" placeholder="Email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                    <button class="btn btn-outline-danger" @click="logout">Or Click Here to Logout</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { updateUser } from '@/api/user';
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
    name: 'settingIndex',
    middleware: 'authenticated',
    asyncData({ store }) {
        const { image, username, bio, email, password } = store.state.user;
        return { image, username, bio, email, password };
    },
    methods: {
        logout() {
            this.$store.commit('setUser', null);
            Cookie.set('user', undefined);
            this.$router.push('/');
        },
        async update() {
            const { data } = await updateUser({user: {email: this.email, bio: this.bio, image: this.image, username: this.username, password: this.password}})
            console.log(data);
            this.$store.commit('setUser', data.user);
            Cookie.set('user', data.user);
        }
    }
}
</script>

<style>

</style>