const vue = new Vue({
    el: '#vue',
    data: {
        show: '',
        question: '',
        conversation: [],
        binday: '',
        botSpeechBubble: 'is-pulled-right bot-bubble',
        customerSpeechBubble: 'is-pulled-left customer-bubble',
    },
    computed: {
        conversationOrdered: function () {
            return this.conversation.slice().reverse();
        }
    },
    mounted: function() {
        this.$refs.questionField.focus()
    },
    methods: {
        askQuestion: function () {
            this.question == '' ? this.question = '...' : this.question = this.question
            this.conversation.push({"BotOrNot": 'not', "QandA": this.question})
              const asked = this.question
              const self = this
              setTimeout(function(){
                  self.getAnswer(asked);
              }, 600)
            this.show = 'conversation'
            this.question = ''
            return
        },
        getAnswer: function (asked) {
            const question = asked.toLowerCase();
            if (question.indexOf('phone') != -1 || question.indexOf('contact') != -1 || question.indexOf('email') != -1) {
                this.conversation.push({"BotOrNot": 'bot', "QandA": "Phone us on 01349 886606. Our call centre will answer your questions or connect you to the right person"})
                return
            }                 
            if (question.indexOf('membership') != -1) {
                this.conversation.push({"HTML": '...'})
                this.conversation.push({"BotOrNot": 'bot', "QandA": "Hmm, are you looking for any of these?"})
                return
            } 
            if (question.indexOf('hi') != -1 || question.indexOf('hello') != -1) {
                this.conversation.push({"BotOrNot": 'bot', "QandA": "Hello!"})
                return
            }
            if (question.indexOf('bye') != -1) {
                this.conversation.push({"BotOrNot": 'bot', "QandA": "Bye!"})
                return
            }
            if (question.indexOf('help') != -1) {
                this.conversation.push({"BotOrNot": 'bot', "QandA": "I can help you with questions you may have regarding the club. Try asking me about membership?"})
                return
            }
            if (question.indexOf('thank') != -1) {
                this.conversation.push({"BotOrNot": 'bot', "QandA": "You're welcome"})
                return
            } else {
                this.conversation.push({"BotOrNot": 'bot', "QandA": "Sorry, I'm just a demo. Ask me about membership..."})
                return
            }
        },
        back2chat: function () {
            this.show = 'conversation'
            this.$refs.questionField.focus()
        },
        clearChat: function() {
            this.conversation = []
            this.$refs.questionField.focus()
        },
        caseNumber: function() {
            this.$dialog.alert({
                title: 'Case submitted',
                message: 'Your case has been submitted<br/>Here is your ref number:<br/><br/> <h3 class="title is-4">XRT4H8JF</h3>',
                type: 'is-success',
                hasIcon: true,
                icon: 'check',
                iconPack: 'fa',
                onConfirm: this.back2chat
            })
        }
    }
})
Vue.component('suggestion-buttons', {
    props: ['data'],
    template: `
    <div class="box has-background-light level" style="margin-bottom:20px;">
        <div class="level-item has-text-centered">
            <button @click="$root.show = 'membership'" class="button is-rounded is-primary"><i class="fa fa-users"></i>&nbsp;membership</button>
        </div>
        <div class="level-item has-text-centered">
            <button @click="$root.show = 'missed-bin'" class="button is-rounded is-danger"><i class="fas fa-exclamation-circle"></i>&nbsp;Missed bin</button>
        </div>
        <div class="level-item has-text-centered">
            <button @click="$root.show = 'garden-waste'" class="button is-rounded is-primary"><i class="fab fa-pagelines"></i>&nbsp;Garden waste</button>
        </div>
    </div>`
})
