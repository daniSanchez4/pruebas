export class Song {
    id: number | undefined;
    style: string
    image: string
    artist: string
    name: string
    duration: number
    reproductions: number
    puntuation: number
    album: string

    
    constructor(
        id: number | undefined,
        style: string,
        image: string,
        artist: string,
        name: string,
        duration: number,
        reproductions: number,
        puntuation: number,
        album: string
    ) {
        this.id = id
        this.style = style
        this.image = image
        this.artist = artist
        this.name = name
        this.duration = duration
        this.reproductions = reproductions
        this.puntuation = puntuation
        this.album = album
    }



    getId(): number | undefined {
        return this.id;
    }

    getStyle(): string {
        return this.style;
    }

    getImage(): string {
        return this.image;
    }

    getArtist(): string {
        return this.artist;
    }

    getName(): string {
        return this.name;
    }

    getDuration(): number {
        return this.duration;
    }

    getReproductions(): number {
        return this.reproductions;
    }

    getPuntuation(): number {
        return this.puntuation;
    }

    getAlbum(): string {
        return this.album;
    }

    
    setId(id: number | undefined): void {
        this.id = id;
    }

    setStyle(style: string): void {
        this.style = style;
    }

    setImage(image: string): void {
        this.image = image;
    }

    setArtist(artist: string): void {
        this.artist = artist;
    }

    setName(name: string): void {
        this.name = name;
    }

    setDuration(duration: number): void {
        this.duration = duration;
    }

    setReproductions(reproductions: number): void {
        this.reproductions = reproductions;
    }

    setPuntuation(puntuation: number): void {
        this.puntuation = puntuation;
    }

    setAlbum(album: string): void {
        this.album = album;
    }



}