# 🎨 Como Personalizar o Aplicativo

## 1️⃣ Alterar o Nome do Aplicativo

### Opção A: Direto no código

**Arquivo:** `/App.tsx` (linha 127)

Procure por:
```tsx
<h1 className="text-center text-blue-600 mb-6 md:mb-8">
  Meu Comunicador
</h1>
```

Altere para o nome que você quiser:
```tsx
<h1 className="text-center text-blue-600 mb-6 md:mb-8">
  Comunicador do João
</h1>
```

### Também altere nos outros arquivos:

**Arquivo:** `/index.html` (linha 10)
```html
<title>Meu Comunicador</title>
```

**Arquivo:** `/public/manifest.json` (linha 2)
```json
"name": "Meu Comunicador",
"short_name": "Comunicador",
```

---

## 2️⃣ Alterar a Imagem do Logo

### Opção A: Usar uma URL de imagem online

**Arquivo:** `/App.tsx` (linha 101)

Procure por:
```tsx
<ImageWithFallback
  src="https://images.unsplash.com/photo-1759932021109-ffbec9251f9b?w=400"
  alt="Logo"
```

Substitua a URL pela imagem que você quiser:
```tsx
<ImageWithFallback
  src="https://sua-imagem.com/logo.png"
  alt="Logo"
```

### Opção B: Usar um emoji

Substitua o componente `ImageWithFallback` por um emoji:

```tsx
<div className="w-16 h-16 md:w-24 md:h-24 rounded-full shadow-lg bg-blue-500 flex items-center justify-center text-4xl md:text-6xl group-hover:shadow-2xl transition-all group-hover:scale-110">
  💬
</div>
```

Troque `💬` por qualquer emoji: 🗣️ 👂 💙 🎯 ⭐ etc.

### Opção C: Upload de arquivo local (fazer via admin)

Posso adicionar um recurso no painel administrativo para você fazer upload do logo direto pela interface. Quer que eu implemente isso?

---

## 3️⃣ Alterar as Cores do Aplicativo

**Arquivo:** `/App.tsx` (linha 91)

Fundo do app:
```tsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-3 md:p-8">
```

Exemplos de outras cores:
- `from-green-50 to-blue-50` (verde para azul)
- `from-pink-50 to-orange-50` (rosa para laranja)
- `from-purple-50 to-pink-50` (roxo para rosa)

---

## 🚀 Quer que eu faça as alterações para você?

Me diga:
1. Qual nome você quer para o aplicativo?
2. Qual logo você quer usar? (URL de imagem ou emoji)

E eu faço todas as alterações automaticamente! 😊
