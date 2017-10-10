<template>
    <div class="free-error-page">
        <div class="free-error-board">
            <h2>404</h2>
            <p class="free-error-intro">访问的页面貌似跑去外太空了！</p>
            <footer>
                <i class="el-icon-fa-arrow-left fa-lg" @click="$router.back()"></i>
                <router-link to="/">
                    <i class="el-icon-fa-home fa-lg"></i>
                </router-link>
            </footer>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.free-error-page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background: #edecec;
    }
    .free-error-board {
        background: #00bcd4;
        box-shadow: 0 1px 11px rgba(0, 0, 0, .27);
        border-radius: 2px;
        position: absolute;
        top: 50%;
        margin-top: -150px;
        color: #fff;
        text-align: center;
        width: 500px;
        left: 50%;
        margin-left: -250px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 225px;
        padding: 15px 15px 75px 15px;
        h2 {
            line-height: 100%;
            color: #fff;
            font-weight: 100;
            font-size: 6rem;
        }
        .free-error-intro {
            overflow: hidden;
            white-space: nowrap;
        }
        footer {
            height: 40px;
            background: rgba(0, 0, 0, .13);
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 10px 0;
            i {
                display: inline-block;
                color: #fff;
                margin: 0 3px;
                line-height: 40px;
                width: 40px;
                height: 40px;
                background: rgba(0, 0, 0, .09);
                border-radius: 50%;
                text-align: center;
                cursor: pointer;
                transition: all;
                transition-duration: .3s;
            }
        }
    }
}
</style>

