export interface Guide {
    id: string;
    title: string;
    icon: string;
    summary: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
}

export const guides: Guide[] = [
    {
        id: "winning-scholarship-essay",
        title: "How to Write a Winning Scholarship Essay",
        icon: "📝",
        summary: "Practical tips and strategies to help you succeed in your scholarship journey.",
        author: "Dr. Sarah Mitchell",
        date: "2025-11-15",
        readTime: "8 min read",
        content: `
      <h2>The Art of the Scholarship Essay</h2>
      <p>Writing a scholarship essay is more than just answering a prompt; it's about telling your unique story in a way that resonates with the selection committee. Your essay is often the only part of the application where your personality can shine through.</p>

      <h3>1. Understand the Prompt</h3>
      <p>Before you start writing, read the prompt multiple times. Identify the key themes and keywords. Are they looking for leadership? Community service? Overcoming adversity? Tailor your story to address these specific points directly.</p>

      <h3>2. Start with a Hook</h3>
      <p>Admissions officers read thousands of essays. Make yours stand out from the first sentence. Instead of saying "I want this scholarship because...", start with a vivid anecdote or a defining moment in your life that illustrates your passion.</p>

      <h3>3. Show, Don't Just Tell</h3>
      <p>Don't just say you are a hard worker. Describe a time when you worked two jobs to support your family while maintaining a 4.0 GPA. Specific details make your claims credible and memorable.</p>

      <h3>4. Be Authentic</h3>
      <p>Don't try to write what you think they want to hear. Write what is true to you. Authenticity rings true and is far more compelling than a generic, "perfect" essay.</p>

      <h3>5. The Power of Revision</h3>
      <p>Your first draft is just the beginning. Step away from your essay for a day and come back with fresh eyes. Ask teachers, mentors, or peers to review it. They can spot grammatical errors and confusing phrasing that you might miss.</p>

      <h3>Conclusion</h3>
      <p>A winning scholarship essay is a blend of personal narrative, clear goals, and direct engagement with the scholarship's mission. Pour your heart into it, polish it until it shines, and submit it with confidence.</p>
    `
    },
    {
        id: "essential-documents-study-abroad",
        title: "10 Essential Documents for Study Abroad",
        icon: "📋",
        summary: "A comprehensive checklist of the paperwork you simply cannot forget.",
        author: "Global Education Team",
        date: "2025-11-10",
        readTime: "5 min read",
        content: `
      <h2>Your Pre-Departure Paperwork Checklist</h2>
      <p>Moving abroad for studies is an exciting adventure, but it comes with a mountain of paperwork. Missing a single document can cause unnecessary stress or even delay your travel. Here is your ultimate checklist.</p>

      <h3>1. Valid Passport</h3>
      <p>Ensure your passport is valid for at least six months <em>beyond</em> your intended return date. If not, renew it immediately.</p>

      <h3>2. Student Visa</h3>
      <p>The most critical document. Keep the original and multiple photocopies. Digital copies stored in the cloud are also a must.</p>

      <h3>3. University Acceptance Letter</h3>
      <p>You will need this for immigration control upon arrival. It proves you have a legitimate reason to enter the country.</p>

      <h3>4. Proof of Finances</h3>
      <p>Bank statements, scholarship award letters, or loan documents proving you can support yourself. Immigration officers often ask for this.</p>

      <h3>5. Health Insurance Documents</h3>
      <p>Proof of coverage is often mandatory for enrollment and visa compliance. Know your policy number and emergency contacts.</p>

      <h3>6. Academic Transcripts & Diplomas</h3>
      <p>Carry certified copies of your previous academic records. Your new university might need them for final verification.</p>

      <h3>7. Medical Records & Prescriptions</h3>
      <p>If you have existing conditions, bring your medical history. If you take medication, bring a doctor's note and a supply to last until you get settled.</p>

      <h3>8. Accommodation Details</h3>
      <p>Address and contact information of where you will be staying for the first few weeks.</p>

      <h3>9. Passport-Sized Photos</h3>
      <p>You'll be surprised how often you need these for student IDs, transport cards, and other registrations. Bring a dozen.</p>

      <h3>10. Emergency Contact List</h3>
      <p>A physical list of contacts (parents, embassy, university international office) in case your phone runs out of battery.</p>
    `
    },
    {
        id: "mastering-interview-process",
        title: "Mastering the Interview Process",
        icon: "🎤",
        summary: "Ace your scholarship or university admission interview with these expert strategies.",
        author: "James Chen, Career Coach",
        date: "2025-11-18",
        readTime: "10 min read",
        content: `
      <h2>Turning Interviews into Offers</h2>
      <p>The interview is your chance to bring your application to life. It's where you move from being a set of statistics to a real person. Here is how to prepare effectively.</p>

      <h3>Research is Key</h3>
      <p>Know everything you can about the scholarship foundation or university. What are their values? Who are their notable alumni? Tailor your answers to align with their mission.</p>

      <h3>Practice Common Questions</h3>
      <ul>
        <li>"Tell me about yourself." (Keep it professional and focused on your academic journey)</li>
        <li>"Why do you deserve this scholarship?" (Focus on your potential impact, not just your need)</li>
        <li>"What are your greatest strengths and weaknesses?" (Be honest, but frame weaknesses as areas for growth)</li>
      </ul>

      <h3>The STAR Method</h3>
      <p>When answering behavioral questions ("Tell me about a time when..."), use the STAR method:</p>
      <ul>
        <li><strong>S</strong>ituation: Set the scene.</li>
        <li><strong>T</strong>ask: What was the challenge?</li>
        <li><strong>A</strong>ction: What did YOU do?</li>
        <li><strong>R</strong>esult: What was the outcome?</li>
      </ul>

      <h3>Body Language Matters</h3>
      <p>Even in virtual interviews, eye contact and posture convey confidence. Sit up straight, smile, and look at the camera, not the screen.</p>

      <h3>Ask Intelligent Questions</h3>
      <p>At the end, when they ask "Do you have any questions for us?", never say no. Ask about mentorship opportunities, alumni networks, or specific program details. It shows you are genuinely interested.</p>
    `
    },
    {
        id: "financial-planning-international",
        title: "Financial Planning for International Students",
        icon: "💰",
        summary: "Budgeting, banking, and managing your money in a new country.",
        author: "Elena Rodriguez",
        date: "2025-11-12",
        readTime: "7 min read",
        content: `
      <h2>Managing Your Money Abroad</h2>
      <p>Studying abroad is an investment. Proper financial planning ensures that you can focus on your studies rather than worrying about your next meal.</p>

      <h3>1. Create a Realistic Budget</h3>
      <p>Research the cost of living in your destination city. Account for rent, food, transport, books, and leisure. Add a 10-15% buffer for unexpected expenses.</p>

      <h3>2. Understand Exchange Rates</h3>
      <p>Currency fluctuations can significantly impact your budget. Use apps to track rates and try to transfer larger sums when the rate is favorable.</p>

      <h3>3. Open a Local Bank Account</h3>
      <p>Using your home bank card often incurs high transaction fees. Opening a local account is usually free for students and makes paying rent and bills much easier.</p>

      <h3>4. Student Discounts are Your Best Friend</h3>
      <p>Always carry your student ID. From museums to transport to software subscriptions, student discounts can save you hundreds of dollars a year.</p>

      <h3>5. Part-Time Work</h3>
      <p>Check your visa regulations. Most student visas allow for 20 hours of work per week during term time. It's a great way to earn extra cash and gain local work experience.</p>
    `
    },
    {
        id: "visa-types-requirements",
        title: "Understanding Visa Types & Requirements",
        icon: "✈️",
        summary: "Navigating the complex world of student visas without the headache.",
        author: "Immigration Desk",
        date: "2025-11-20",
        readTime: "6 min read",
        content: `
      <h2>Demystifying the Student Visa</h2>
      <p>Visa regulations vary wildly by country, but the core principles remain similar. Here is a general guide to understanding what you are getting into.</p>

      <h3>F-1 vs. J-1 (USA)</h3>
      <p><strong>F-1</strong> is for full-time academic students. It allows for limited on-campus work and Optional Practical Training (OPT) after graduation.</p>
      <p><strong>J-1</strong> is for exchange visitors and scholars. It often comes with a "two-year home-country physical presence requirement," meaning you must return home for two years after your program.</p>

      <h3>Tier 4 (UK)</h3>
      <p>Now called the "Student Visa". It requires a Confirmation of Acceptance for Studies (CAS) from your university and proof of English proficiency.</p>

      <h3>Schengen Student Visas (Europe)</h3>
      <p>Allows travel within the Schengen area. However, a residence permit is usually required for stays longer than 90 days.</p>

      <h3>Key Requirements for All</h3>
      <ul>
        <li><strong>Proof of Funds:</strong> You must prove you can afford tuition + living expenses.</li>
        <li><strong>Ties to Home Country:</strong> You must demonstrate an intent to return home after your studies (for non-immigrant visas).</li>
        <li><strong>Clean Criminal Record:</strong> Police clearance certificates are often required.</li>
      </ul>
    `
    },
    {
        id: "finding-right-university",
        title: "Finding the Right University for You",
        icon: "🎓",
        summary: "It's not just about rankings. Here is how to find your perfect academic match.",
        author: "Academic Advisors Board",
        date: "2025-11-05",
        readTime: "9 min read",
        content: `
      <h2>Beyond the League Tables</h2>
      <p>Choosing a university is one of the biggest decisions of your life. While rankings matter, they aren't everything. Here is a holistic approach to finding your best fit.</p>

      <h3>1. Academic Fit</h3>
      <p>Does the university offer the specific specialization you are interested in? Look at the curriculum, not just the major name. Who are the professors? Are they leaders in their field?</p>

      <h3>2. Location, Location, Location</h3>
      <p>Do you thrive in a bustling city or a quiet campus town? Consider the climate, the culture, and the proximity to industries relevant to your career.</p>

      <h3>3. Campus Culture & Support</h3>
      <p>What is life like outside the classroom? Are there clubs and societies that interest you? Is there a strong international student support system?</p>

      <h3>4. Career Services</h3>
      <p>Investigate their employability stats. Do they have strong industry connections? Do they offer internship placements?</p>

      <h3>5. Financial Feasibility</h3>
      <p>Look at the total cost of attendance, not just tuition. What scholarship opportunities does the university itself offer to international students?</p>

      <h3>Conclusion</h3>
      <p>The "best" university is the one where <em>you</em> will thrive academically, socially, and personally. Trust your research and your intuition.</p>
    `
    }
];
