import React from 'react';

const RegisterSidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-full lg:w-5/12 bg-[#0d141c] p-12 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        data-alt="Abstract 3D digital waves pattern in dark blue and purple gradients representing creativity and flow"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXkDkgGEAGwuTueztvHoBFhgk7nWXXlm1titCf_3EhF_BZ3trOzbWAQt5rPHWbGfXWC7tE7yp5TP7xhvoH0rKSHL9KilcuepZdc8HZZNYaFpZuM_cLA6Q6LkAK8CLOSb7FyPEbz4nowIm-CFiPZXXqVFW7uEYjuwoYDOlvj04SwMuig3Xqw-8iNVuSk9EHJYYBTfxxj8_PmArXAikHRIM46Ehh3NIMh3LPsfuY2YSvYjGO3RAAYXWjqlcledYQUTVgNSBzpCsWVn0g')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d141c] via-[#0d141c]/50 to-transparent z-10"></div>
      <div className="relative z-20 mt-auto">
        <div className="size-12 text-primary mb-6">
          <span className="material-symbols-outlined text-5xl">design_services</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Join the future of creativity</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Experience AI-powered design solutions crafted for global excellence. From branding to digital marketing, Wynqor brings your vision to life.
        </p>
        <div className="flex items-center gap-3 mt-8">
          <div className="flex -space-x-3">
            <img
              alt="User avatar"
              className="w-10 h-10 rounded-full border-2 border-[#0d141c]"
              data-alt="Portrait of a female user"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL4LrsQyjmdIQQdCdjGfqrkcu4ppo0mW70jYWRoJGSBzzwPoH7DXYHDmU4TAb9_at3Ur8GZw5u2T9omQ7B4D9v0JQP6FopgwvW9u07eyePu29aBKkMnAHGSujlNPkBN1UEh-jkVPVjX8p2VmfgTf2jZ8AQd7RWQDGH6WmWoMtzPgmgutjPDpubTGcnwTuBm9gYnpv_jYBKu_F_tgZemoPwgpFFuwCNRj1VU0qqGUPN3e4cpn3sc4SttBuhl3CZgJmXJWKjade46hsX"
            />
            <img
              alt="User avatar"
              className="w-10 h-10 rounded-full border-2 border-[#0d141c]"
              data-alt="Portrait of a male user"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyXI9VPIhO0-58p9IfosVER8Uk2zkMkGqHw899ghaJri599vpdhd2Cc2-lPsiIPjg1Kwpz8QSLiMasNJK6Vt7yubxq-BaMsj38w0Gtr-s-gPEQ-3tmkg45wKjze9YTf0oQG4Es9lGqqNT-LmYa2lWR7YlQj88vlCDI60I24E7gbYc_NoewGxb96j6OryC1AkStn1racB78ujELOhqYdfiV60SyvaLkc0Hni5sXuSNpCQXoCclyxijJwxkq8chR-RSo9bpBEwHvT3rj"
            />
            <img
              alt="User avatar"
              className="w-10 h-10 rounded-full border-2 border-[#0d141c]"
              data-alt="Portrait of a female user"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCnDdfG4ncid_3DvQHEjX_ezghL5yIF-mGIk5cC_vFOs5fxaTB_NDMH-cJKkus2gSDreaHf6mp-wmPgtSHWjnr4AEYZ5zaT78FnEd4M7OpqQTnj5WgxlF_G5zM4OWaVLxKf6hkvEYyH7OoXxWoifLzLj9TbScfAPzWbUynDyTw9ijUYrQ9w2al954BIPedV2V5u7wpVe_QQue89w95p5fW4pWnS3JjTGZTVM_WDCVybslS48h7UYp1vGes8zki5IN_st2CqJqNuz7V"
            />
          </div>
          <span className="text-sm font-medium text-white">Joined by 10k+ creators</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterSidebar;
