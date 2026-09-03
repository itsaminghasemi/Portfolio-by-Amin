/**
 * Family Knowledge Exam Platform - Interactive Quiz System
 * Premium implementation with exam selection, search, and print functionality
 * Synced with Portfolio theme
 */

(function() {
  'use strict';

  // Exam data - Family Knowledge and Population (50 questions)
  const familyKnowledgeData = [
    ['انسان برای برنامه‌ریزی جهت یک زندگی شایسته، پیش از هر چیز به چه چیزی نیاز دارد؟', ['شناخت خویشتن', 'شناخت جامعه', 'شناخت دیگران', 'شناخت محیط']],
    ['قرآن کریم انسان را دارای کدام ابعاد معرفی می‌کند؟', ['مادی و فرامادی', 'فردی و اجتماعی', 'جسمانی و اقتصادی', 'دنیوی و اجتماعی']],
    ['از دیدگاه کتاب، رابطه جنسی مطلوب زن و مرد در چه چارچوبی قرار می‌گیرد؟', ['ازدواج', 'دوستی', 'هم‌خانگی', 'رابطه عاطفی بدون تعهد']],
    ['یکی از راهکارهای مهم برای جلوگیری از غلبه هوس‌های نفسانی بر عقل و خرد جوان چیست؟', ['خویشتن‌داری و تقویت عفاف', 'افزایش روابط عاطفی', 'بی‌توجهی به نیازهای عاطفی', 'حذف ارتباطات اجتماعی']],
    ['کدام گزینه درباره روابط خارج از ازدواج مطابق مطالب کتاب صحیح است؟', ['می‌تواند پیامدهای جسمانی، روانی و معنوی نامطلوب داشته باشد', 'همیشه موجب استحکام خانواده می‌شود', 'هیچ پیامد اجتماعی ندارد', 'فقط در صورت ازدواج پیامد منفی دارد']],
    ['هم‌خانگی به چه معناست؟', ['زندگی مشترک زن و مرد بدون ازدواج قانونی', 'زندگی زوجین پس از عقد', 'زندگی با خانواده همسر', 'زندگی مستقل پس از ازدواج']],
    ['کدام مورد از پیامدهای مطرح‌شده برای هم‌خانگی است؟', ['نبود تضمین‌های قانونی و افزایش بی‌ثباتی', 'افزایش قطعی امنیت خانوادگی', 'افزایش حمایت قانونی از فرزندان', 'استحکام بیشتر روابط زناشویی']],
    ['کدام گزینه از عوامل مؤثر در استحکام خانواده است؟', ['محبت و ابراز علاقه', 'فردگرایی', 'بی‌تفاوتی', 'پنهان‌کردن مشکلات']],
    ['در مواجهه با رفتار نامطلوب همسر، نخستین گام چیست؟', ['بررسی کنیم آیا رفتار واقعاً اشتباه بوده یا برداشت ما نادرست است', 'فوراً مقابله کنیم', 'مسئله را به خانواده‌ها منتقل کنیم', 'رابطه را قطع کنیم']],
    ['در مرحله بعد، درباره رفتار نامطلوب همسر چه موضوعی باید بررسی شود؟', ['اینکه آیا واکنشی در برابر رفتار اشتباه ما بوده است', 'اینکه دیگران درباره او چه نظری دارند', 'اینکه چه کسی مقصر بزرگ‌تری است', 'اینکه چگونه او را تنبیه کنیم']],
    ['برای بهبود زندگی مشترک در صورت وجود امکان اصلاح، کتاب بر چه چیزی تأکید می‌کند؟', ['یادگیری مهارت حل مسئله و اصلاح رفتار', 'نادیده گرفتن همه مشکلات', 'افزایش فاصله عاطفی', 'واگذاری همه مسائل به دیگران']],
    ['مطابق مطالب فصل مدیریت اقتصادی، مسئولیت تأمین مخارج زندگی بر عهده چه کسی گذاشته شده است؟', ['شوهر', 'همسران به صورت کاملاً یکسان', 'فرزندان', 'خانواده‌های دو طرف']],
    ['نقش مهم زن در مدیریت اقتصادی خانواده، طبق کتاب، چیست؟', ['مدیریت مصرف و آموزش شیوه صحیح مصرف به فرزندان', 'حذف کامل درآمد خانواده', 'واگذاری همه امور اقتصادی به دیگران', 'بی‌توجهی به هزینه‌ها']],
    ['تفکیک نقش‌ها در خانواده به چه معنا نیست؟', ['کم‌ارزش دانستن نقش زن یا شوهر', 'وجود مسئولیت‌های متفاوت', 'تقسیم مسئولیت‌ها', 'توجه به مصلحت خانواده']],
    ['سازگاری و مدارا با همسر با چه هدفی توصیه شده است؟', ['ایجاد آرامش و فراهم کردن زمینه حل مسائل و اصلاح رفتار', 'پذیرش همه خطاها بدون بررسی', 'حذف مسئولیت‌پذیری', 'جلوگیری از هر نوع گفت‌وگو']],
    ['چرا برخی زوج‌ها فرزندآوری را مانع آسایش می‌دانند؟', ['هزینه‌های فرزند را بیش از اندازه برآورد می‌کنند و در رفاه نیز افراط می‌شود', 'فرزند هیچ فایده‌ای برای خانواده ندارد', 'تربیت فرزند هیچ هزینه‌ای ندارد', 'فرزند فقط یک مسئولیت اجتماعی است']],
    ['کتاب درباره هزینه‌های فرزندپروری چه توصیه‌ای دارد؟', ['هزینه‌های ضروری را از هزینه‌های غیرضروری تفکیک کنیم', 'همه هزینه‌ها را حذف کنیم', 'برای فرزند بیشترین مصرف ممکن را داشته باشیم', 'فقط هزینه‌های غیرضروری را افزایش دهیم']],
    ['فواید فرزندآوری برای همسران جوان در کتاب در چه ابعادی مطرح شده است؟', ['جسمانی، روانی و خانوادگی', 'اقتصادی، سیاسی و اجتماعی', 'آموزشی، شغلی و سیاسی', 'فقط جسمانی و اقتصادی']],
    ['از فواید روانی فرزندآوری کدام است؟', ['فراهم شدن فرصت برای دوست داشتن و دوست داشته شدن', 'حذف کامل مشکلات زندگی', 'افزایش قطعی درآمد', 'کاهش ارتباطات خانوادگی']],
    ['فرزندآوری چگونه می‌تواند ارتباط زوجین با والدین خود را تقویت کند؟', ['با تجربه نقش پدر و مادر و درک بیشتر ارزشمندی آن', 'با قطع ارتباط با خانواده‌ها', 'با افزایش فاصله میان نسل‌ها', 'با کاهش ارتباطات خانوادگی']],
    ['یکی از فواید خانوادگی فرزندآوری چیست؟', ['انتقال ارزش‌های فکری، اخلاقی و معنوی و دارایی‌های مادی به نسل‌های بعد', 'حذف ارتباط میان نسل‌ها', 'کاهش پیوندهای خانوادگی', 'جلوگیری از انتقال ارزش‌ها']],
    ['از نظر کتاب، فرزندآوری چه ارتباطی با سعادت دنیوی و اخروی دارد؟', ['از موضوعات مهم زندگی مشترک و تربیت نیکوی فرزندان از امور مهم آن است', 'هیچ ارتباطی با زندگی مشترک ندارد', 'فقط یک موضوع اقتصادی است', 'فقط به دوران کودکی مربوط است']],
    ['کدام گزینه از موانع مهم فرزندآوری است؟', ['مشکلات اقتصادی و هزینه‌های زیاد تربیت فرزندان', 'افزایش حمایت‌های اجتماعی', 'یادگیری مهارت فرزندپروری', 'امید به آینده']],
    ['کدام مورد از موانع فرهنگی ـ اجتماعی فرزندآوری در کتاب است؟', ['نهادینه شدن فرهنگ «فرزند کمتر، زندگی بهتر»', 'توجه به آینده', 'ارزش‌گذاری نقش مادری', 'حمایت اجتماعی']],
    ['کدام مورد از موانع مرتبط با شرایط زندگی امروز است؟', ['اشتغال و نگرانی‌های مربوط به آینده شغلی زنان متأهل', 'افزایش مهارت‌های خانوادگی', 'حمایت از مادر و کودک', 'آموزش فرزندپروری']],
    ['کدام گزینه درباره راهکارهای رفع موانع فرهنگی ـ اجتماعی فرزندآوری صحیح است؟', ['اصلاح باورها، توجه به فواید فرزندان و تقویت حمایت اجتماعی', 'افزایش ایده‌آل‌گرایی در رفاه', 'بی‌توجهی به آینده', 'حذف آموزش فرزندپروری']],
    ['برای رفع نگرانی درباره تربیت فرزندان، کتاب چه راهکاری را مطرح می‌کند؟', ['آموختن و به‌کارگیری روش‌های تربیت صحیح', 'کنار گذاشتن فرزندآوری', 'واگذاری تربیت به جامعه', 'بی‌توجهی به تربیت']],
    ['منظور از بارداری‌های هوشمندانه در کتاب چیست؟', ['بارداری متناسب با امکانات همراه با اقدامات لازم برای تسهیل فرزندپروری', 'بارداری بدون توجه به شرایط', 'به تعویق انداختن همیشگی بارداری', 'افزایش هزینه‌های غیرضروری']],
    ['کدام مورد به عنوان راهکار تسهیل فرزندپروری مطرح شده است؟', ['تعدیل روحیه ایده‌آل‌گرایی در تأمین رفاه فرزندان و فرهنگ قناعت', 'افزایش مصرف نمایشی', 'حذف حمایت‌های اجتماعی', 'افزایش انتظارات رفاهی']],
    ['نگاه اسلامی به روزی فرزند با برنامه‌ریزی چگونه است؟', ['توکل به خدا با برنامه‌ریزی و تلاش منافاتی ندارد', 'برنامه‌ریزی با توکل ناسازگار است', 'تلاش هیچ نقشی در روزی ندارد', 'فقط درآمد بالا اهمیت دارد']],
    ['کدام مورد از آثار معنوی فرزندآوری در کتاب بیان شده است؟', ['وعده اجر و ثواب الهی برای تحمل سختی‌های فرزندآوری و تربیت', 'حذف همه مشکلات والدین', 'افزایش قطعی ثروت', 'بی‌نیازی از تلاش']],
    ['کدام مورد می‌تواند از پیامدهای تک‌فرزندی باشد؟', ['محدود شدن برخی فرصت‌های تعامل و تجربه روابط خواهر و برادری', 'افزایش قطعی مهارت اجتماعی', 'حذف همه مشکلات تربیتی', 'افزایش قطعی استقلال کودک']],
    ['کدام گزینه درباره پیامدهای تک‌فرزندی دقیق‌تر است؟', ['پیامدهای آن می‌تواند به شرایط خانواده و شیوه تربیت وابسته باشد', 'همه پیامدها در همه کودکان قطعی است', 'تک‌فرزندی هیچ پیامدی ندارد', 'همه پیامدها فقط اقتصادی هستند']],
    ['کدام مورد از موانع تصمیم به داشتن فرزند بیشتر است؟', ['ترس از طلاق و آینده فرزندان در صورت وجود تعارضات زناشویی', 'افزایش آرامش خانوادگی', 'تقویت مهارت فرزندپروری', 'حمایت اجتماعی']],
    ['کدام مورد می‌تواند مانع فرزند دوم باشد؟', ['تصور والدین از ناتوانی خود در تربیت فرزندان', 'افزایش اعتماد به مهارت‌های فرزندپروری', 'حمایت خانواده', 'آموزش صحیح والدین']],
    ['کدام مورد از موانع فرزندآوری مرتبط با سبک زندگی است؟', ['تمایل به رفاه بیشتر و اهمیت دادن بیشتر به تفریحات و علایق فردی', 'فرهنگ قناعت', 'دوراندیشی', 'توجه به خانواده']],
    ['فردگرایی چگونه می‌تواند با فرزندآوری تعارض پیدا کند؟', ['فرزند با برخی اهداف فردی مانند تحصیل و کار در رقابت دیده می‌شود', 'فرزند باعث افزایش اهداف فردی می‌شود', 'فردگرایی همیشه فرزندآوری را تقویت می‌کند', 'فردگرایی هیچ ارتباطی با تصمیم به فرزندآوری ندارد']],
    ['کدام گزینه از حمایت‌های مرتبط با فرزندآوری است؟', ['حمایت‌های اجتماعی از فرزندآوری و ارزش‌گذاری جامعه و بستگان', 'حذف خدمات اجتماعی', 'افزایش هزینه‌های درمان', 'کاهش حمایت از مادر و کودک']],
    ['هدف کلی برخی سیاست‌های افزایش جمعیت چیست؟', ['تسهیل ازدواج، افزایش فرزندآوری و ایجاد محیط دوستدار خانواده', 'کاهش حمایت از خانواده', 'افزایش هزینه‌های فرزندپروری', 'حذف خدمات اجتماعی']],
    ['طبق مطالب کتاب، افزایش کیفیت جمعیت به چه چیزی نیز نیاز دارد؟', ['کمیت مناسب جمعیت جوان و پویا', 'کاهش جمعیت جوان', 'حذف برنامه‌ریزی جمعیتی', 'افزایش جمعیت سالمند']],
    ['اگر همسر مرتکب خطایی شد و عذری آورد، کدام رفتار مطابق توصیه کتاب است؟', ['پذیرفتن عذر و کمک به اصلاح رفتار', 'تشدید اختلاف', 'بی‌توجهی کامل', 'انتقال فوری موضوع به دیگران']],
    ['مهم‌ترین نتیجه حل مسئله و اصلاح رفتار در خانواده چیست؟', ['بهبود و شیرین‌تر شدن زندگی در صورت امکان اصلاح', 'حذف همه اختلافات', 'جلوگیری از گفت‌وگو', 'افزایش فاصله زوجین']],
    ['حمایت زن از شوهر در زمینه اشتغال، طبق کتاب، چه اثری می‌تواند داشته باشد؟', ['تقویت توانایی او و کمک به حفظ اقتصاد خانواده', 'کاهش مسئولیت‌پذیری', 'حذف مدیریت اقتصادی', 'افزایش بی‌نظمی']],
    ['چرا مدیریت مصرف در خانواده اهمیت دارد؟', ['در ایجاد آسایش خانواده و آموزش مصرف صحیح به فرزندان نقش دارد', 'باعث حذف نیازهای اساسی می‌شود', 'فقط برای افزایش مصرف است', 'فقط به فرزندان مربوط نیست']],
    ['کدام گزینه با مفهوم مدارا در خانواده سازگارتر است؟', ['تحمل و آرامش برای فراهم کردن زمینه حل مشکلات و اصلاح رفتار', 'پذیرفتن هر خطا بدون اصلاح', 'بی‌تفاوتی نسبت به همسر', 'حذف مسئولیت‌پذیری']],
    ['کدام مورد از فواید اجتماعی‌تر فرزندآوری در خانواده است؟', ['گسترش ارتباطات خانوادگی و اجتماعی شدن بیشتر', 'قطع ارتباط با والدین', 'کاهش تعامل خانوادگی', 'حذف ارتباط بین نسل‌ها']],
    ['چرا مصرف‌گرایی می‌تواند هزینه فرزندآوری را سنگین‌تر کند؟', ['چون تأمین امکانات رفاهی فرزند می‌تواند به افراط کشیده شود', 'چون فرزند هیچ هزینه‌ای ندارد', 'چون هزینه‌های ضروری حذف می‌شوند', 'چون مصرف همیشه باعث کاهش هزینه می‌شود']],
    ['کدام گزینه نمونه‌ای از دوراندیشی در فرزندآوری است؟', ['توجه به آینده و سالمندی همراه با حضور فرزندان جوان و توانمند', 'تمرکز فقط بر راحتی امروز', 'نادیده گرفتن آینده', 'حذف برنامه‌ریزی']],
    ['کدام گزینه مجموعه‌ای از موانع فرزندآوری را درست‌تر نشان می‌دهد؟', ['اقتصاد، نگرانی تربیتی، اشتغال، هزینه‌ها و فرهنگ فرزند کمتر', 'فقط مشکلات اقتصادی', 'فقط ناباروری', 'فقط اشتغال']],
    ['کدام گزینه بهترین جمع‌بندی از رویکرد کتاب درباره فرزندآوری است؟', ['توجه همزمان به فواید فرزندآوری، رفع موانع، برنامه‌ریزی و تربیت صحیح', 'نادیده گرفتن امکانات خانواده', 'تمرکز فقط بر هزینه‌ها', 'کنار گذاشتن برنامه‌ریزی']]
  ];

  // Letters for options
  const letters = ['A', 'B', 'C', 'D'];

  // State
  let currentExam = null;
  let questions = [];

  /**
   * Shuffle array using Fisher-Yates algorithm
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   */
  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /**
   * Process exam data into question objects
   * @param {Array} data - Raw exam data
   * @returns {Array} Processed questions
   */
  function processQuestions(data) {
    return data.map(([text, options]) => {
      const choices = shuffleArray(options.map((text, index) => ({ text, correct: index === 0 })));
      return {
        text,
        choices,
        answer: letters[choices.findIndex(choice => choice.correct)]
      };
    });
  }

  /**
   * Render questions to the DOM
   */
  function renderQuestions() {
    const main = document.getElementById('main');
    const answerGrid = document.getElementById('answer-grid');
    
    let html = '';
    questions.forEach((q, i) => {
      // Add section headings
      if (i === 0) {
        html += '<h2 class="section-heading" data-section="a">🔴 بخش A — خیلی مهم و امتحانی</h2>';
      }
      if (i === 30) {
        html += '<h2 class="section-heading" data-section="b">🟡 بخش B — مهم</h2>';
      }
      if (i === 40) {
        html += '<h2 class="section-heading" data-section="c">🟢 بخش C — مرور نهایی</h2>';
      }
      
      html += `
        <article class="question-card" data-question="${i}">
          <div class="question-text">سؤال ${i + 1}: ${q.text}</div>
          <div class="options-container" role="group" aria-label="گزینه‌های سؤال ${i + 1}">
            ${q.choices.map((choice, j) => `
              <button class="option-btn" type="button" data-correct="${choice.correct}">
                <span dir="ltr">${letters[j]})</span> ${choice.text}
              </button>
            `).join('')}
          </div>
          <p class="feedback-text" aria-live="polite"></p>
        </article>
      `;
    });
    
    main.innerHTML = html;
    
    // Render answer key
    answerGrid.innerHTML = questions.map((q, i) => `
      <div class="answer-item">
        <span class="answer-number">سؤال ${i + 1}</span>
        <span class="answer-key">${q.answer}</span>
      </div>
    `).join('');
    
    // Update answer count
    document.getElementById('answerCount').textContent = `${questions.length} سؤال چهارگزینه‌ای`;
  }

  /**
   * Start an exam
   * @param {string} examType - Type of exam to start
   */
  window.startExam = function(examType) {
    if (examType !== 'family-knowledge') {
      console.warn('Exam type not implemented yet');
      return;
    }

    currentExam = examType;
    questions = processQuestions(familyKnowledgeData);
    
    // Hide selector, show exam
    document.getElementById('examSelector').classList.add('hidden');
    document.getElementById('activeExamSection').classList.remove('hidden');
    
    // Render questions
    renderQuestions();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('✅ Exam started:', examType);
  };

  /**
   * Return to exam selection
   */
  window.backToSelection = function() {
    // Hide active exam, show selector
    document.getElementById('activeExamSection').classList.add('hidden');
    document.getElementById('examSelector').classList.remove('hidden');
    
    // Clear search
    const searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.value = '';
    }
    
    // Reset result text
    const resultText = document.getElementById('result');
    if (resultText) {
      resultText.textContent = '';
    }
    
    currentExam = null;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('← Returned to exam selection');
  };

  /**
   * Initialize event listeners
   */
  function initEventListeners() {
    // Question click handling
    const main = document.getElementById('main');
    if (main) {
      main.addEventListener('click', event => {
        const button = event.target.closest('.option-btn');
        if (!button) return;
        
        const card = button.closest('.question-card');
        const buttons = card.querySelectorAll('.option-btn');
        const feedback = card.querySelector('.feedback-text');
        const correct = button.dataset.correct === 'true';
        
        // Remove previous states
        buttons.forEach(item => item.classList.remove('is-correct', 'is-wrong'));
        
        // Add new state
        button.classList.add(correct ? 'is-correct' : 'is-wrong');
        
        // Show feedback
        feedback.textContent = correct ? '✓ پاسخ درست است.' : '✕ پاسخ نادرست است.';
        feedback.className = `feedback-text ${correct ? 'correct' : 'wrong'}`;
      });
    }

    // Search functionality
    const searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.addEventListener('input', event => {
        const query = event.target.value.trim().toLocaleLowerCase('fa');
        let matches = 0;
        
        document.querySelectorAll('.question-card').forEach(card => {
          const visible = !query || card.innerText.toLocaleLowerCase('fa').includes(query);
          card.classList.toggle('hidden', !visible);
          if (visible) matches++;
        });
        
        // Show/hide section headings based on visible questions
        document.querySelectorAll('[data-section]').forEach(heading => {
          let next = heading.nextElementSibling;
          let visible = false;
          while (next && !next.matches('[data-section]')) {
            if (next.classList.contains('question-card') && !next.classList.contains('hidden')) {
              visible = true;
              break;
            }
            next = next.nextElementSibling;
          }
          heading.classList.toggle('hidden', !visible);
        });
        
        // Update result text
        const resultText = document.getElementById('result');
        if (resultText) {
          resultText.textContent = query 
            ? (matches ? `${matches} سؤال یافت شد.` : 'هیچ سؤالی یافت نشد.')
            : '';
        }
      });
    }

    // Print functionality
    const printBtn = document.getElementById('print');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }
  }

  /**
   * Update footer year dynamically
   */
  function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /**
   * Initialize the exam platform
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeExamPlatform);
    } else {
      initializeExamPlatform();
    }
  }

  /**
   * Main initialization function
   */
  function initializeExamPlatform() {
    // Initialize event listeners
    initEventListeners();
    
    // Update footer year
    updateFooterYear();
    
    // Log initialization
    console.log('📚 Family Knowledge Exam Platform initialized successfully!');
    console.log('Select an exam to begin practicing.');
  }

  // Start initialization
  init();

})();
