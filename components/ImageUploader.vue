<template>
  <div>
    <input type="file" accept=".jpeg,.jpg,.image/jpeg" @change="uploadFile" />
  </div>
</template>

<script>
import { unwrap } from '~/utils/fetchUtils';

  export default {
    methods: {
      async uploadFile(e) {
        const file = e.target.files[0];

        if(!file) return;

        const filename = file.name.split('.').slice(0, -1).join('.') + Date.now()
        const options = {
          timestamp: Date.now(),
          public_id: filename
        }

        const response = await unwrap(await fetch('/api/cloudinary/signature', {
          method: 'POST',
          body: JSON.stringify(options),
          headers: {
            'Content-Type': 'application/json'
          },
        }))
        const signature = response.json.signature

        const readData = (fileObj) => new Promise((resolve, reject) => {
          const reader = new FileReader()

          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(fileObj)
        })

        const data = await readData(file);
        const asset = await this.$cloudinary.upload(data, {
          ...options,
          apiKey: this.$config.cloudinary.apiKey,
          signature
        })

        this.$emit('file-uploaded', asset.public_id)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>