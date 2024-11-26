// Configuração AWS
AWS.config.update({
    region: "us-east-2", // Região correta do seu bucket
    // NÃO inclua suas credenciais diretamente aqui. Utilize IAM roles ou Cognito.
  });
  
  const s3 = new AWS.S3();
  const bucketOrigem = "bucket-de-origem"; // Substitua pelo seu bucket S3
  
  // Função para upload do arquivo
  async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
  
    if (!file) {
      document.getElementById("status").innerText = "Por favor, selecione um arquivo!";
      return;
    }
  
    // Configuração dos parâmetros de upload
    const params = {
      Bucket: bucketOrigem,
      Key: file.name, // Nome do arquivo no S3
      Body: file,
      ContentType: file.type,
    };
  
    try {
      document.getElementById("status").innerText = "Carregando arquivo...";
      const result = await s3.upload(params).promise();
      document.getElementById("status").innerText = `Upload concluído: ${result.Location}`;
      console.log("Upload realizado com sucesso:", result);
      console.log("A replicação para o bucket de destino será feita automaticamente.");
    } catch (err) {
      document.getElementById("status").innerText = "Erro no upload. Verifique o console.";
      console.error("Erro no upload:", err);
    }
  }
  
  // Evento para o botão de upload
  document.getElementById("uploadButton").addEventListener("click", uploadFile);
  