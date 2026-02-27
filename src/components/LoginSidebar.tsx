import React from 'react';

const LoginSidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:flex-1 relative bg-surface-dark items-end justify-center overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        data-alt="Abstract dark fluid 3D shapes with blue neon lighting representing AI creativity"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX9gbDIlJ-z78TEjoSsmKyUqPoodOmxxu3zuBEi0OXgJ2k8SzIAH0Y6zYBN6_2O1BHHkvyw5HhyHzb-h3pvyxNhZVaYGKlPvkjc_tbg-Kpskxoc7BNvwzMhTBudCa08WVBabZs7Nd0pNdelKD8PjkhYxUN3McJW0TQdhWwKdKAsxDFyntPE7Nb-4MBYYVl6jZwIpMh-Htr062SjmwyALBCNwCGQ1JsBoHK_Khow4IEthZZThcny2Edi19WLNcueuOreUlNe3rK_zpm"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
      <div className="relative z-10 p-16 max-w-2xl">
        <blockquote className="text-3xl font-bold text-white mb-6 leading-tight">
          "Design is not just what it looks like and feels like. Design is how it works."
        </blockquote>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <img
              className="w-10 h-10 rounded-full border-2 border-background-dark"
              data-alt="User avatar 1"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEEUgNOBfk5O5R_KbcNo7v98EH4TZ7c2GJKxkd8iJ3IxZsv7P9khuy0BmHoXlAJJU9vbbDvfyI3Dag0V_rwA5wiTCVmYN8CCUmI6D19bV842euMr8K012BUKCdD6ghDJiZ1FbpYNVf2S5G_eYKz8YA6p-2OhTXRIjsHN4vSsgj7iH2IsCt9rfADrDBX61vj-4ph2Z8VlEchQt86wX27mQkNGXVcciJmYa2SeyZRp_QgU-rWumuEn3OpiCXrRA6unzlHlwMbAZKyJpK"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-background-dark"
              data-alt="User avatar 2"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfE7YbPkG3LjwGWVVjMjTpGIVqOPamOHd-Z2pvJ9YCKWYlU05g_QEe4m7aQ7x8J2l9AY0HA96PZP342C7_y8gCuHgZZ7dUSSneEIg3RFd2EFtr5LCGw-9pdrQVJ83Pcx0idAEMGFtgDz36nbWgL3WofKPja2pxv86tA2I9gYx73-3maGz5iMxVaZ9Eaqzf0Pa6gsddHho2OYtYSStiWVDtZtxzGiiD4s4RwhbZZ07oTUaIXZb1f7wh1AFNFPt_35CZ4K5Fanls7Eu7"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-background-dark"
              data-alt="User avatar 3"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVnNQrRsj0UI6hGPEr_WCObBDB9eO4EkTpFj0-_i9cFBGU8MCyZMZKaCqTpFinoKpC0kpV9ODsDtJA8ngI2hNcGBiihEX8XxFdY2dhc6-hcOAexR_6I5iVEH0Fho5-3Y9iweeodd0mv8BWG3vbMXfVwcB03gZMuR9wWw6s3LYqDlgWX4Wdcs-sJWsftDCLORslcx8-yiRVvcfuvQO-YWwoQ07vIos4LkeWxVwP3OevXVxJchYVSxLkVj7B2k5tEL0Ogwk01Tujz_Kq"
            />
          </div>
          <p className="text-gray-300 text-sm font-medium">Joined by 10k+ creators</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSidebar;
