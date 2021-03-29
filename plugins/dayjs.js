import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('date', (value, config) => {
    return dayjs(value).format(config);
});
