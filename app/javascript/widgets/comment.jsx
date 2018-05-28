import $ from 'jquery';

$(function() {
  $(document).find("#new_comment").on('submit', function(event){
      event.preventDefault();
      var url = $(this).attr('action');
      var method = $(this).attr('method');
      $.ajax({
          url: url,
          method: method,
          data: $(this).serialize(),
          success: function(data){
              $("#comments_list").prepend(data);
              $("#comment_content").val("");
              $(":submit").removeAttr("disabled");
          }
      })
  })
})
