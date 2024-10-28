const baseHost = "artemis.yt.vip.host";
const port = 3389;
const hostTableBody = document.getElementById("hostTableBody");

let activeHosts = [];

function renderHosts() {
    hostTableBody.innerHTML = "";
    const now = new Date();

    activeHosts.forEach(host => {
        const remainingDays = Math.max(0, Math.ceil((host.endTime - now) / (1000 * 60 * 60 * 24)));
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${host.endpoint}</td>
            <td>${host.deviceId}</td>
            <td>${remainingDays}</td>
        `;
        hostTableBody.appendChild(row);
    });
}

document.getElementById("hostForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const endpoint = `${baseHost}:${port}`;
    const now = new Date();
    const endTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week later
    const deviceId = "unknown";

    if (!activeHosts.find(host => host.endpoint === endpoint)) {
        activeHosts.push({ endpoint, deviceId, endTime });
        renderHosts();
    } else {
        alert("این هاست قبلاً ایجاد شده است.");
    }
});