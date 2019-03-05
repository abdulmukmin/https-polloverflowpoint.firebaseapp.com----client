<template>
    <!--Body Content here-->
    <div class="d-flex justify-content-start  flex-wrap mt-2 mb-2 mr-2 ml-2">
        <!--Tags Cards here-->
        <div class="card ml-2 mt-2" style="width: 13rem;" v-for="(item, index) in array" :key="item.index">
            <div class="card-body">
                    <div class="card-body">
                        <h6 class="card-title">{{item.name}}</h6>
                        <hr>
                        <h6 class="card-price">{{item.description  }}</h6>
                        <hr>
                        <h6 class="card-price">{{item.detail}}</h6>
                    </div>
            </div>
            <!--End of tags cards here-->
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            array: []
        }
    }
}
</script>
