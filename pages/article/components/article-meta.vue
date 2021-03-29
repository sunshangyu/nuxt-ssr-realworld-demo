<template>
    <div class="article-meta">
        <nuxt-link :to="{name: 'profile', params: {username: article.author.username} }"><img :src="article.author.image" /></nuxt-link>
        <div class="info">
            <nuxt-link :to="{name: 'profile', params: {username: article.author.username} }" class="author">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
        </div>
        <!-- 判断当前文章的作者是否为自己 -->
        <template v-if="user.username === article.author.username">
            <button class="btn btn-sm btn-outline-secondary" @click="jumpToEdit">
                <i class="ion-edit"></i>
                &nbsp; Edit Article
            </button>
            &nbsp;
            <button class="btn btn-sm btn-outline-danger">
                <i class="ion-heart"></i>
                &nbsp; Delete Article
            </button>
        </template>
        <template v-else>
            <button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}">
                <i class="ion-plus-round"></i>
                &nbsp; Follow {{article.author.username}}
                <span class="counter">(10)</span>
            </button>
            &nbsp;
            <button class="btn btn-sm btn-outline-primary" :class="{active: article.author.favorited}">
                <i class="ion-heart"></i>
                &nbsp; Favorite Post <span class="counter">(29)</span>
            </button>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        jumpToEdit() {
            this.$router.push({ name: 'edit', query: {slug: this.article.slug}});
        }
    }
};
</script>

<style>
</style>