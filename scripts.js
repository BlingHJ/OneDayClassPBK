// 예시로 가상의 사용자 아이디 배열을 만들어 사용합니다.
const onlineUsers = ['blisserica', 'blingbling', 'beehive1', 'viasta', 'labradoodle'];

// 페이지가 로드되면 실행되는 함수
document.addEventListener('DOMContentLoaded', () => {
  const onlineUsersList = document.getElementById('online-users');

  // 가상의 사용자 아이디 배열을 기반으로 동적으로 목록을 생성합니다.
  onlineUsers.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = user;
    onlineUsersList.appendChild(listItem);
  });
});


// 게시글을 추가하는 기능
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const postContainer = document.getElementById('post-container');
  
    submitBtn.addEventListener('click', () => {
      const postTitle = document.getElementById('post-title').value;
      const postContent = document.getElementById('post-content').value;
  
      if (postTitle.trim() === '' || postContent.trim() === '') {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
      }
  
      const postElement = createPostElement(postTitle, postContent);
      postContainer.appendChild(postElement);
  
      // 입력 폼 비우기
      document.getElementById('post-title').value = '';
      document.getElementById('post-content').value = '';
    });
  
    function createPostElement(title, content) {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
  
      const contentElement = document.createElement('p');
      contentElement.textContent = content;
  
      postElement.appendChild(titleElement);
      postElement.appendChild(contentElement);
  
      return postElement;
    }
  });


  $(document).ready(function () {
    $('#loading').hide();
  });

  function chatGPT() {
    const api_key = "sk-LpwtgBuJ46vdLtNHQxyCT3Bl"  // <- API KEY 입력
    const keywords = document.getElementById('keywords').value
    $('#loading').show();

    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: keywords + '에 대하여 최대한 도움이 되는 답변을 해줘.' },
    ]

    const data = {
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      n: 1,
      messages: messages,
    }

    $.ajax({
      url: "https://api.openai.com/v1/chat/completions",
      method: 'POST',
      headers: {
        Authorization: "Bearer " +api_key+"bkFJVGC5YKqxjkjZ2jgvgkxp",
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    }).then(function (response) {
      $('#loading').hide();
      console.log(response)
      let result = document.getElementById('result')
      let pre = document.createElement('pre')

      pre.innerHTML = "\n\n" + response.choices[0].message.content
      result.appendChild(pre)

      document.getElementById('keywords').value = ''
    });
  }