<template>
    <div class="home-page">

    <div class="banner">
        <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
        </div>
    </div>

    <div class="container page">
        <div class="row">

            <div class="col-md-9">
                <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                    <li class="nav-item" v-if="user">
                        <nuxt-link class="nav-link" :class="{active: tab === 'your_feed'}" exact :to="{name: 'Home', query: { tab: 'your_feed' }}">Your Feed</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" :class="{active: tab === 'global_feed'}" exact :to="{name: 'Home', query: { tab: 'global_feed' }}">Global Feed</nuxt-link>
                    </li>
                    <li class="nav-item" v-if="tag">
                        <nuxt-link class="nav-link" :class="{active: tab === 'tag'}" exact :to="{name: 'Home', tag}">#{{tag}}</nuxt-link>
                    </li>
                </ul>
                </div>

                <div class="article-preview" v-for="article in articles" :key="article.slug">
                    <div class="article-meta">
                        <nuxt-link :to="{
                            name: 'profile',
                            params: {
                                username: article.author.username
                            }
                        }">
                            <img :src="article.author.image" />
                        </nuxt-link>
                        <div class="info">
                            <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}" class="author">{{article.author.username}}</nuxt-link>
                            <span class="date">{{article.createdAt | date('MMM DD')}}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active: article.favorited}" @click="onFavorite(article)" :disabled="article.clickDisabled">
                            <i class="ion-heart"></i> {{article.favoritesCount}}
                        </button>
                    </div>
                    <nuxt-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
                        <h1>{{article.title}}</h1>
                        <p>{{article.description}}</p>
                        <span>Read more...</span>
                    </nuxt-link>
                </div>

            </div>

            <!-- 分页列表 -->
            <ul class="pagination">
                <li class="page-item" v-for="item in totalPage" :key="item" :class="{active: item === page}">
                    <nuxt-link :to="{name: 'Home', query: { page: item, tab, tag }}" class="page-link">{{item}}</nuxt-link>
                </li>
            </ul>

            <div class="col-md-3">
                <div class="sidebar">
                    <p>Popular Tags</p>

                    <div class="tag-list">
                        <nuxt-link v-for="tag in tagData" :key="tag" :to="{name: 'Home', query: { tag, tab: 'tag' }}" class="tag-pill tag-default">{{tag}}</nuxt-link>
                    </div>
                </div>
            </div>

        </div>
    </div>

    </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '@/api/article';
import { getTags } from '@/api/tag';
import { mapState } from 'vuex'
export default {
    name: 'HomeIndex',
    async asyncData({query, store}) {
        const page = Number.parseInt(query.page || 1);
        const limit = 20;
        const tag = query.tag;
        const tab = query.tab || 'global_feed';
        const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles;
        const result = await Promise.all([loadArticles({ limit, offset: (page - 1) * limit, tag }), getTags()]);
        const { articles, articlesCount } = result[0].data;
        const { tags: tagData } = result[1].data;
        return {
            articles,
            articlesCount,
            page,
            limit,
            tagData,
            tag,
            tab: query.tab || 'global_feed'
        }
    },
    watchQuery: ['page', 'tag', 'tab'],
    computed: {
        totalPage() {
            return Math.ceil(this.articlesCount / this.limit);
        },
        ...mapState(['user'])
    },
    methods: {
        async onFavorite(article) {
            article.clickDisabled = false;
            if (article.favorited) {
                await deleteFavorite(article.slug);
                article.favorited = false;
                article.favoritesCount -= 1;
                article.clickDisabled = true;
            } else {
                await addFavorite(article.slug);
                article.favorited = true;
                article.favoritesCount += 1;
                article.clickDisabled = true;
            }
        }
    }
}
</script>

<style>

</style>