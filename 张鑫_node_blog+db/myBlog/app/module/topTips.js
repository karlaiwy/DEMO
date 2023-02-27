import Template from '../control/tempControl';

export default function topTips(message) { 
  $('.blog-topTips--wrap').html(Template.render('topTips', { errMsg:message }))
  $('.blog-topTips--wrap').addClass('animate')
  setTimeout(() => { 
    $('.blog-topTips--wrap').removeClass('animate')
  }, 5000)
}