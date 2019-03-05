<template>
  <div id="navbar">
    <router-link to="/">
        <button type="button" class="btn btn-outline-secondary mt-4">Home</button>  
    </router-link>
    <br>
    <br>
    <div class="btn-group dropright mb-2">
        <button type="button" class="btn btn-outline-secondary">pollOverflowPoint</button>
        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
            <router-link to="/tags">
                <div class="dropdown-item">Tags</div>
            </router-link>
            <router-link to="/bestcontributor">
                <div class="dropdown-item">Users</div>
            </router-link>
        </div>
    </div>
    <div class="btn-group dropright" v-if="propislogin">
        <button type="button" class="btn btn-outline-secondary">my pollOverflowPoint</button>
        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
            <router-link to="/myquestions">
                <div class="dropdown-item" >
                    Question
                </div>
            </router-link>
            <router-link to="/myanswers">
                <div class="dropdown-item" >
                    Answer
                </div>
            </router-link>
            <router-link to="/changepassword">
                <div class="dropdown-item" >
                    Change Password
                </div>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['propislogin']
}
</script>
